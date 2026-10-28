import React, { useState, useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import CommandPalette from './CommandPalette';

const Layout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Navbar
        onMobileToggle={() => setMobileOpen(!mobileOpen)}
        onOpenCommandPalette={() => setPaletteOpen(true)}
      />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Sidebar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 3, md: 4 },
            width: { md: `calc(100% - 240px)` },
            overflowX: 'hidden',
          }}
        >
          <Container maxWidth="xl" sx={{ p: 0 }}>
            <Box key={location.pathname} className="page-enter">
              <Outlet />
            </Box>
          </Container>
        </Box>
      </Box>

      {/* Global Raycast/Linear-Style Command Palette */}
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </Box>
  );
};

export default Layout;
