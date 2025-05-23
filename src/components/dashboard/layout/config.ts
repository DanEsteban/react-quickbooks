import { paths } from '@/paths';
import { NavItemConfig } from '@/types/nav';

//TODO: para agregar iconos hay que dirigirse al archivo nav-icons.tsx
export interface LayoutConfig {
     navItems: NavItemConfig[];
}
export const layoutConfig = {
     navItems: [
          {
               key: 'dashboards',
               title: 'Dashboards',
               items: [
                    { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'house' },
                    { key: 'analytics', title: 'Analytics', href: paths.dashboard.analytics, icon: 'chart-pie' },
                    { key: 'ecommerce', title: 'E-commerce', href: paths.dashboard.eCommerce, icon: 'cube' },
                    { key: 'crypto', title: 'Crypto', href: paths.dashboard.crypto, icon: 'currency-eth' },
               ],
          },
          {
               key: 'general',
               title: 'General',
               items: [
                    {
                         key: 'settings',
                         title: 'Settings',
                         href: paths.dashboard.settings.account,
                         icon: 'gear',
                         matcher: { type: 'startsWith', href: '/dashboard/settings' },
                    },
                    {
                         key: 'customers',
                         title: 'Customers',
                         icon: 'users',
                         items: [
                              { key: 'customers', title: 'List customers', href: paths.dashboard.customers.list },
                              { key: 'customers:create', title: 'Create customer', href: paths.dashboard.customers.create },
                              { key: 'customers:details', title: 'Customer details', href: paths.dashboard.customers.details('1') },
                         ],
                    },
                    {
                         key: 'products',
                         title: 'Products',
                         icon: 'shopping-bag-open',
                         items: [
                              { key: 'products', title: 'List products', href: paths.dashboard.products.list },
                              { key: 'products:create', title: 'Create product', href: paths.dashboard.products.create },
                              { key: 'products:details', title: 'Product details', href: paths.dashboard.products.details('1') },
                         ],
                    },
                    {
                         key: 'orders',
                         title: 'Orders',
                         icon: 'shopping-cart-simple',
                         items: [
                              { key: 'orders', title: 'List orders', href: paths.dashboard.orders.list },
                              { key: 'orders:create', title: 'Create order', href: paths.dashboard.orders.create },
                              { key: 'orders:details', title: 'Order details', href: paths.dashboard.orders.details('1') },
                         ],
                    },
                    {
                         key: 'invoices',
                         title: 'Invoices',
                         icon: 'receipt',
                         items: [
                              { key: 'invoices', title: 'List invoices', href: paths.dashboard.invoices.list },
                              { key: 'invoices:create', title: 'Create invoice', href: paths.dashboard.invoices.create },
                              { key: 'invoices:details', title: 'Invoice details', href: paths.dashboard.invoices.details('1') },
                         ],
                    },
                    {
                         key: 'jobs',
                         title: 'Jobs',
                         icon: 'read-cv-logo',
                         items: [
                              { key: 'jobs:browse', title: 'Browse jobs', href: paths.dashboard.jobs.browse },
                              { key: 'jobs:create', title: 'Create job', href: paths.dashboard.jobs.create },
                              {
                                   key: 'jobs:company',
                                   title: 'Company details',
                                   href: paths.dashboard.jobs.companies.overview('1'),
                                   matcher: { type: 'startsWith', href: '/dashboard/jobs/companies/1' },
                              },
                         ],
                    },
                    {
                         key: 'logistics',
                         title: 'Logistics',
                         icon: 'truck',
                         items: [
                              { key: 'logistics:metrics', title: 'Metrics', href: paths.dashboard.logistics.metrics },
                              { key: 'logistics:fleet', title: 'Fleet', href: paths.dashboard.logistics.fleet },
                         ],
                    },
                    {
                         key: 'blog',
                         title: 'Blog',
                         icon: 'text-align-left',
                         items: [
                              { key: 'blog', title: 'List posts', href: paths.dashboard.blog.list },
                              { key: 'blog:create', title: 'Create post', href: paths.dashboard.blog.create },
                              { key: 'blog:details', title: 'Post details', href: paths.dashboard.blog.details('1') },
                         ],
                    },
                    {
                         key: 'social',
                         title: 'Social',
                         icon: 'share-network',
                         items: [
                              {
                                   key: 'social:profile',
                                   title: 'Profile',
                                   href: paths.dashboard.social.profile.timeline,
                                   matcher: { type: 'startsWith', href: '/dashboard/social/profile' },
                              },
                              { key: 'social:feed', title: 'Feed', href: paths.dashboard.social.feed },
                         ],
                    },
                    { key: 'file-storage', title: 'File storage', href: paths.dashboard.fileStorage, icon: 'upload' },
                    {
                         key: 'mail',
                         title: 'Mail',
                         href: paths.dashboard.mail.list('inbox'),
                         icon: 'envelope-simple',
                         matcher: { type: 'startsWith', href: '/dashboard/mail' },
                    },
                    {
                         key: 'chat',
                         title: 'Chat',
                         href: paths.dashboard.chat.base,
                         icon: 'chats-circle',
                         matcher: { type: 'startsWith', href: '/dashboard/chat' },
                    },
                    { key: 'calendar', title: 'Calendar', href: paths.dashboard.calendar, icon: 'calendar-check' },
                    { key: 'tasks', title: 'Tasks', href: paths.dashboard.tasks, icon: 'kanban' },
               ],
          },
     ],
} satisfies LayoutConfig;
