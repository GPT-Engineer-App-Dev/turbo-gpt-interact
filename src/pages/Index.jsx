import { useState } from 'react';
import { Box, Input, Button, Text, VStack, useToast, Collapse } from '@chakra-ui/react';
import { create } from 'lib/openai';

const Index = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [showOutput, setShowOutput] = useState(false);
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
    setShowOutput(false); // Hide output box when new request is made
    const res = await create({
      messages: [{ role: 'user', content: prompt }],
      model: 'gpt-3.5-turbo'
    });

    if (res.data.choices && res.data.choices.length > 0) {
      setResponse(res.data.choices[0].message.content);
      setShowOutput(true); // Show output box when response is received
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
      <Collapse in={showOutput} animateOpacity>
        {response && (
          <Text fontSize="xl" p={6} borderWidth="2px" borderColor="blue.500" borderRadius="md">
            {response}
          </Text>
        )}
      </Collapse>
    </VStack>
  );
};

export default Index;