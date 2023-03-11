/* tslint:disable:max-line-length */
import {FuseNavigationItem} from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    /*{
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    },*/
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    /*{
        id   : 'example',
        title: 'Example',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/example'
    },*/
    /*{
        id: 'establishments',
        title: 'Établissements',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/establishments'
    }*/
    {
        id: 'competition-management',
        title: 'Gestion de concours',
        subtitle: '',
        type: 'group',
        icon: 'heroicons_outline:volume-up',
        children: [
            {
                id: 'competition-management.competitions',
                title: 'Concours',
                type: 'basic',
                icon: 'heroicons_outline:volume-up',
                link: '/competition-management/competitions'
            }
        ]
    },
    {
        id: 'establishments',
        title: 'Établissements',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/establishments'
    }
];
