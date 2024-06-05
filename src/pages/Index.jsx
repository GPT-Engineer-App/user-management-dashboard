import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Container, Text, VStack, Button, Table, Thead, Tbody, Tr, Th, Td, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import { FaUserPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Text fontSize="2xl">Your Blank Canvas</Text>
        <Text>Chat with the agent to start making edits.</Text>
        <Button as={Link} to="/user-management" colorScheme="teal" size="lg">
          Go to User Management
        </Button>
      </VStack>
    </Container>
  );
};

const UserManagement = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ username: "", password: "", role: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    setUsers([...users, { ...formData, id: users.length + 1, createdDate: new Date().toLocaleDateString() }]);
    setFormData({ username: "", password: "", role: "" });
    onClose();
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={4} align="stretch">
        <Button leftIcon={<FaUserPlus />} colorScheme="teal" onClick={onOpen}>
          Create User
        </Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>S/N</Th>
              <Th>Username</Th>
              <Th>Password</Th>
              <Th>Role</Th>
              <Th>Created Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user, index) => (
              <Tr key={user.id}>
                <Td>{index + 1}</Td>
                <Td>{user.username}</Td>
                <Td>{user.password}</Td>
                <Td>{user.role}</Td>
                <Td>{user.createdDate}</Td>
                <Td>
                  <IconButton aria-label="View" icon={<FaEye />} mr={2} />
                  <IconButton aria-label="Edit" icon={<FaEdit />} mr={2} />
                  <IconButton aria-label="Delete" icon={<FaTrash />} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="username" mb={4}>
              <FormLabel>Username</FormLabel>
              <Input name="username" value={formData.username} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="password" mb={4}>
              <FormLabel>Password</FormLabel>
              <Input name="password" type="password" value={formData.password} onChange={handleInputChange} />
            </FormControl>
            <FormControl id="role" mb={4}>
              <FormLabel>Role</FormLabel>
              <Select name="role" value={formData.role} onChange={handleInputChange}>
                <option value="">Select role</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/user-management" element={<UserManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
