// pages/AdminPanel.jsx
import { useState, useEffect } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel, Box } from '@chakra-ui/react';
import AdminProducts from '../components/admin/AdminProducts';
import AdminUsers from '../components/admin/AdminUsers';
import AdminCategories from '../components/admin/AdminCategories';

export default function AdminPanel() {
  return (
    <Box p={4}>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Productos</Tab>
          <Tab>Categorías</Tab>
          <Tab>Usuarios</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AdminProducts />
          </TabPanel>
          <TabPanel>
            <AdminCategories />
          </TabPanel>
          <TabPanel>
            <AdminUsers />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}