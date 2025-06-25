// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;


const UserConfig = [
  {
    title: 'Dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Clientes potenciales',
    path: '/dashboard/lead',
    icon: icon('ic_lead'),
  },
  {
    title: 'administrador Clientes',
    path: '/dashboard/contact',
    icon: icon('ic_contact'),
  },
  {
    title: 'Pólizas',
    path: '/dashboard/policy',
    icon: icon('ic_policy'),
  },
  {
    title: 'Tareas',
    path: '/dashboard/task',
    icon: icon('ic_task'),
  },
  {
    title: 'Reuniones',
    path: '/dashboard/meeting',
    icon: icon('ic_meeting'),
  },
  {
    title: 'Llamadas',
    path: '/dashboard/call',
    icon: icon('ic_call'),
  },
  /*  {
    title: 'Correos',
    path: '/dashboard/email',
    icon: icon('ic_email'),
  },
   */  
  {
    title: 'Calendario',
    path: '/dashboard/calendar',
    icon: icon('ic_calendar'),
  },
  {
    title: 'Administador de documentos',
    path: '/dashboard/document',
    icon: icon('ic_document'),
  },
  /* {
    title: 'Plantillas de correo',
    path: '/dashboard/emailtemplate',
    icon: icon('ic_emailTemplate'),
  },
   */  
];

export default UserConfig;
