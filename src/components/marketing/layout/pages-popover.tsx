import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import type { NavItemConfig } from '@/types/nav';
import { RouterLink } from '@/components/core/link';
import { paths } from '@/paths';

interface GroupConfig {
  key: string;
  title: string;
  items: Omit<NavItemConfig, 'items'>[];
}


const authGroup: GroupConfig = {
  key: 'auth-group',
  title: 'Acceso',
  items: [
    { key: 'login', title: 'Iniciar sesión', href: paths.auth.login },
    { key: 'register', title: 'Registrarse', href: paths.auth.register },
  ],
};

export function PagesPopover(): React.JSX.Element {
  return (
    <Box 
      sx={{ display: 'grid', gap: 3, p: 3 }}
    >
      <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
            <Stack component="li" spacing={1}>
              <div>
                <Box
                  sx={{
                    border: '1px solid var(--mui-palette-divider)',
                    borderRadius: '12px',
                    boxShadow: 'var(--mui-shadows-8)',
                    display: 'inline-block',
                    p: '6px 12px',
                  }}
                >
                  <Typography variant="subtitle2">{authGroup.title}</Typography>
                </Box>
              </div>
              <Stack component="ul" spacing={0.5} sx={{ listStyle: 'none', m: 0, p: 0 }}>
                {authGroup.items.map((item) => {
                  return (
                    <li key={item.key}>
                      <Box
                      
                          {...(item.href
                          ? item.external
                            ? { component: 'a', href: item.href, target: '_blank' }
                            : { component: RouterLink, href: item.href }
                          : {})}
                          
                        sx={{
                          alignItems: 'center',
                          borderRadius: 1,
                          color: 'var(--mui-palette-text-primary)',
                          display: 'flex',
                          p: '6px 12px',
                          textDecoration: 'none',
                          whiteSpace: 'nowrap',
                          '&:hover': { bgcolor: 'var(--mui-palette-action-hover)' },
                        }}
                      >
                        <Box sx={{ flex: '1 1 auto' }}>
                          <Typography
                            component="span"
                            sx={{ fontSize: '0.875rem', fontWeight: 500, lineHeight: '28px' }}
                          >
                            {item.title}
                          </Typography>
                        </Box>
                      </Box>
                    </li>
                  );
                })}
              </Stack>
            </Stack>
          </Stack>
    </Box>
  );
}
