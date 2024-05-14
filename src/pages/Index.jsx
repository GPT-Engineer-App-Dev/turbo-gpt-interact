import { useState } from 'react';
import { Box, Input, Button, Text, VStack, useToast } from '@chakra-ui/react';
import { create } from 'lib/openai';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const toast = useToast();

  const handleInputChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    if (!prompt) {
      toast({
        title: 'Error',
        description: "Please enter a prompt.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const res = await create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo'
    });

    if (res.data.choices && res.data.choices.length > 0) {
      setResponse(res.data.choices[0].message.content);
    } else {
      toast({
        title: 'Error',
        description: "Failed to fetch response.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={4} align="stretch" m={8}>
      <Box>
        <Input
          placeholder="Enter your prompt here..."
          value={prompt}
          onChange={handleInputChange}
          size="lg"
        />
      </Box>
      <Box>
        <Button onClick={handleSubmit} colorScheme="blue" size="lg">Submit</Button>
      </Box>
      <Box>
        {response && (
          <Text fontSize="lg" p={4} borderWidth="1px" borderRadius="lg">
            {response}
          </Text>
        )}
      </Box>
    </VStack>
  );
};

export default Index;