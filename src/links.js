
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import BuildIcon from '@material-ui/icons/Build';
import HomeIcon from '@material-ui/icons/Home';
import DescriptionIcon from '@material-ui/icons/Description';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';


export const links = [
        {
        name: 'Home',
        icon: HomeIcon,
        route: '/Home/',
        },
        {
        name: 'FoodsAndMedicines',
        icon: LocalDiningIcon,
        route: '/FoodsAndMedicines/',
        },
        {
        name: 'Services',
        icon: BuildIcon,
        route: '/Services/',
        },
        {
        name: 'Documents',
        icon: DescriptionIcon,
        route: '/Documents/',
        },
        {
        name: 'Admin',
        icon: SupervisorAccountIcon,
        route: '/Admin/',
        }


];