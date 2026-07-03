import { useMemo, useState } from "react";
import AppointmentHeader from "../components/appointments/AppointmentHeader";
import AppointmentStats from "../components/appointments/AppointmentStats";
import AppointmentFilters from "../components/appointments/AppointmentFilters";
import AppointmentTable from "../components/appointments/AppointmentTable";
import BookAppointmentModal from "../components/appointments/BookAppointmentModal";
import { appointments as mockAppointments } from "../data/appointments.mock";
import type { Appointment } from "../types/appointment.types";

const formatDisplayDate=(d:string,t:string)=>new Date(`${d}T${t}`).toLocaleDateString("en-US",{month:"short",day:"2-digit",year:"numeric"})+" • "+new Date(`${d}T${t}`).toLocaleTimeString("en-US",{hour:"numeric",minute:"2-digit"});

export default function PatientAppointments(){
const [appointments,setAppointments]=useState<Appointment[]>(mockAppointments);
const [search,setSearch]=useState("");
const [status,setStatus]=useState("All");
const [department,setDepartment]=useState("All");
const [open,setOpen]=useState(false);
const [editing,setEditing]=useState<Appointment|null>(null);

const filteredAppointments=useMemo(()=>appointments.filter(a=>
a.doctor.toLowerCase().includes(search.toLowerCase()) &&
(status==="All"||a.status===status) &&
(department==="All"||a.department===department)
),[appointments,search,status,department]);

const handleBookAppointment=(data:any)=>{
const item:Appointment={id:Date.now(),initials:data.doctor.split(" ").map((x:string)=>x[0]).join("").slice(0,2).toUpperCase(),doctor:data.doctor,department:data.department,date:formatDisplayDate(data.date,data.time),rawDate:data.date,rawTime:data.time,reason:data.reason,status:"Pending",action:"Reschedule"};
setAppointments(p=>[item,...p]);
};

const handleUpdateAppointment=(id:number,data:any)=>{
setAppointments(p=>p.map(a=>a.id===id?{...a,doctor:data.doctor,department:data.department,rawDate:data.date,rawTime:data.time,reason:data.reason,date:formatDisplayDate(data.date,data.time),status:"Pending"}:a));
setEditing(null);
};

const handleCancel=(id:number)=>{
setAppointments(p=>p.map(a=>a.id===id?{...a,status:"Cancelled",action:"Cancelled"}:a));
};

return(<div className="space-y-6">
<AppointmentHeader onBookAppointment={()=>{setEditing(null);setOpen(true);}}/>
<AppointmentStats appointments={appointments}/>
<AppointmentFilters search={search} status={status} department={department} onSearchChange={setSearch} onStatusChange={setStatus} onDepartmentChange={setDepartment}/>
<AppointmentTable appointments={filteredAppointments} onReschedule={(a)=>{setEditing(a);setOpen(true);}} onCancel={handleCancel}/>
<BookAppointmentModal open={open} onClose={()=>{setOpen(false);setEditing(null);}} onBookAppointment={handleBookAppointment} appointment={editing} onUpdateAppointment={handleUpdateAppointment}/>
</div>);
}