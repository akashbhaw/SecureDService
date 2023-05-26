// component
import SvgColor from '../../../components/svg-color';


// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'My Docs',
    path: '/dashboard/docs',
    icon: icon('ic_secure'),
  },
  {
    title: 'Shared with me',
    path: '/dashboard/shared',
    icon: icon('ic_shared'),
  },
  {
    title: 'Recent',
    path: '/dashboard/recent',
    icon: icon('ic_recent'),
  },
  {
    title: 'Trashed',
    path: '/dashboard/trashed',
    icon: icon('ic_trash'),
  },


];

export default navConfig;
