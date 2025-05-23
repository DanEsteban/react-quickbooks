export const paths = {
     home: '/',
     checkout: '/checkout',
     contact: '/contact',
     pricing: '/pricing',
     auth: {
          login: '/auth/login',
          register: '/auth/register',
     },
     admin: {
          dashboard: '/admin/dashboard',
          empresas: '/admin/dashboard/empresas',
          usuarios: '/admin/dashboard/usuarios',
          settings: {
               account: '/admin/dashboard/settings/account',
               security: '/admin/dashboard/settings/security'
          }
     },
     dashboard: {
          overview: '/dashboard',
          // usuarios: (empresaId: string | number) => `/empresa/${empresaId}/dashboard/usuarios`,
          settings: {
               // company: (empresaId: string | number) => `/empresa/${empresaId}/dashboard/settings/company`,
               account: '/dashboard/settings/account',
               billing: '/dashboard/settings/billing',
               integrations: '/dashboard/settings/integrations',
               notifications: '/dashboard/settings/notifications',
               security: '/dashboard/settings/security',
               team: '/dashboard/settings/team',
          },
          planCuentas: (empresaId: string | number) => `/empresa/${empresaId}/dashboard/plan-cuentas`,
          transacciones: (empresaId: string | number) => `/empresa/${empresaId}/dashboard/transacciones`,
          centroCostos: (empresaId: string | number) => `/empresa/${empresaId}/dashboard/centro-costos`,
          asientos: {
               index: (empresaId: string | number) => `/empresa/${empresaId}/dashboard/asientos`,
               create: (empresaId: string | number) => `/empresa/${empresaId}/dashboard/asientos/create`,
               preview: (empresaId: string | number, asientoId: number) =>
                    `/empresa/${empresaId}/dashboard/asientos?previewId=${asientoId}`,
               details: (empresaId: string | number, asientoId: number) =>
                    `/empresa/${empresaId}/dashboard/asientos/${asientoId}`,
               pdf: (empresaId: string | number, asientoId: number) =>
                    `/empresa/${empresaId}/dashboard/asientos/pdf/${asientoId}`,
          },
          perdidasGanancias: (empresaId: string | number) => `/empresa/${empresaId}/dashboard/perdidas-ganancias`,
          balanceGeneral: (empresaId: string | number) => `/empresa/${empresaId}/dashboard/balance-general`,
          mayorGeneral: (empresaId: string | number) => `/empresa/${empresaId}/dashboard/mayor-general`,
          libroDiario: (empresaId: string | number) => `/empresa/${empresaId}/dashboard/libro-diario`,
          balanceComprobacion: (empresaId: string | number) => `/empresa/${empresaId}/dashboard/balance-comprobacion`,
          blank: '/dashboard/blank',
          analytics: '/dashboard/analytics',
          blog: {
               list: '/dashboard/blog',
               details: (postId: string) => `/dashboard/blog/${postId}`,
               create: '/dashboard/blog/create',
          },
          calendar: '/dashboard/calendar',
          chat: {
               base: '/dashboard/chat',
               compose: '/dashboard/chat/compose',
               thread: (threadType: string, threadId: string) => `/dashboard/chat/${threadType}/${threadId}`,
          },
          crypto: '/dashboard/crypto',
          customers: {
               list: '/dashboard/customers',
               create: '/dashboard/customers/create',
               details: (customerId: string) => `/dashboard/customers/${customerId}`,
          },
          eCommerce: '/dashboard/e-commerce',
          fileStorage: '/dashboard/file-storage',
          i18n: '/dashboard/i18n',
          invoices: {
               list: '/dashboard/invoices',
               create: '/dashboard/invoices/create',
               details: (invoiceId: string) => `/dashboard/invoices/${invoiceId}`,
          },
          jobs: {
               browse: '/dashboard/jobs',
               create: '/dashboard/jobs/create',
               companies: {
                    overview: (companyId: string) => `/dashboard/jobs/companies/${companyId}`,
                    reviews: (companyId: string) => `/dashboard/jobs/companies/${companyId}/reviews`,
                    activity: (companyId: string) => `/dashboard/jobs/companies/${companyId}/activity`,
                    team: (companyId: string) => `/dashboard/jobs/companies/${companyId}/team`,
                    assets: (companyId: string) => `/dashboard/jobs/companies/${companyId}/assets`,
               },
          },
          logistics: { metrics: '/dashboard/logistics', fleet: '/dashboard/logistics/fleet' },
          mail: {
               list: (label: string) => `/dashboard/mail/${label}`,
               details: (label: string, emailId: string) => `/dashboard/mail/${label}/${emailId}`,
          },
          orders: {
               list: '/dashboard/orders',
               create: '/dashboard/orders/create',
               preview: (orderId: string) => `/dashboard/orders?previewId=${orderId}`,
               details: (orderId: string) => `/dashboard/orders/${orderId}`,
          },
          products: {
               list: '/dashboard/products',
               create: '/dashboard/products/create',
               preview: (productId: string) => `/dashboard/products?previewId=${productId}`,
               details: (productId: string) => `/dashboard/products/${productId}`,
          },
          social: {
               profile: { timeline: '/dashboard/social/profile', connections: '/dashboard/social/profile/connections' },
               feed: '/dashboard/social/feed',
          },
          tasks: '/dashboard/tasks',
     },
     pdf: {
          invoice: (invoiceId: string) => `/pdf/invoices/${invoiceId}`,
          //asiento: (asientoId: number) => `/pdf/asientos/${asientoId}`
     },
     components: {
          index: '/components',
          buttons: '/components/buttons',
          charts: '/components/charts',
          colors: '/components/colors',
          detailLists: '/components/detail-lists',
          forms: '/components/forms',
          gridLists: '/components/grid-lists',
          groupedLists: '/components/grouped-lists',
          inputs: '/components/inputs',
          modals: '/components/modals',
          quickStats: '/components/quick-stats',
          tables: '/components/tables',
          typography: '/components/typography',
     },
     notAuthorized: '/errors/not-authorized',
     notFound: '/errors/not-found',
     internalServerError: '/errors/internal-server-error',
     docs: 'https://material-kit-pro-react-docs.devias.io',
     purchase: 'https://mui.com/store/items/devias-kit-pro',
} as const;
