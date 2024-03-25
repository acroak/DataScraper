/*
Component to gather Report Information 
Step 1 in report checklist.
*/

import React from 'react';
import { View } from 'react-native';
import { DefaultTheme as PaperTheme, Provider, Text, TextInput, Title, Button } from 'react-native-paper';

const questions = [
    {
        id: 1,
        question: 'Tester Name:',
        answer: '',
    },
    {
        id: 2,
        question: 'Last Known User:',
        answer: '',
    },
    {
        id: 3,
        question: 'Kit Id:',
        answer: '',
    },
    {
        id: 4,
        question: 'Phone ID:',
        answer: '',
    },
    {
        id: 5,
        question: 'Left Sensor ID:',
        answer: '',
    },
    {
        id: 6,
        question: 'Right Sensor ID:',
        answer: '',
    },
    // Add more questions as needed
  ];
  
/*
Component to get user information about the report.

navigation is a navigation object
*/
const ReportInfo = ({navigation}) => {

    //user's answers
    const [answers, setAnswers] = React.useState(questions);

    //handle when a user enters or changes an answer
    const handleAnswerChange = (questionId, text) => {
      const updatedAnswers = answers.map((question) => {
        if (question.id === questionId) {
          question.answer = text;
        }
        return question;
      });
  
      setAnswers(updatedAnswers);
    };
    
    //navigate to the next component, and pass along the user's responses
    const submitAnswers = () => {
      // Handle the answers array
        console.log(answers);
        navigation.navigate("Phone Inspection", {report1: answers});
    };
  
    return (
      <Provider theme={ChecklistTheme}>
        <View style={ChecklistTheme.formContainer}>
        <Text variant="headlineMedium">Report Info:</Text>
          {questions.map((question) => (
            <View key={question.id} style={ChecklistTheme.questionContainer}>
              <Title style={ChecklistTheme.question}>{question.question}</Title>
              <TextInput
                mode="outlined"
                value={question.answer}
                onChangeText={(text) => handleAnswerChange(question.id, text)}
              />
            </View>
          ))}
  
        <View style={ChecklistTheme.buttonContainer}>
                <Button mode="contained" onPress={submitAnswers} style={ChecklistTheme.blueButton} testID = "ContinueButton">
                    <Text style={ChecklistTheme.buttonCopy}>Continue</Text>
                </Button>
            </View>
        </View>
      </Provider>
    );
  };
  
  const ChecklistTheme = {
    ...PaperTheme,
    colors: {
        ...PaperTheme.colors,
        primary: '#257C52',
        accent: '#f1c40f',
        background: '#ffffff',
        surface: '#ffffff',
        text: '#333333',
        backgroundColor: '#000',
    },
    formContainer: {
        flex: 1,
        padding: 16,
        flexDirection: 'column',
        width: '33.33%',
        alignSelf: 'center',
        borderRadius: '3px',
        backgroundColor: '#fff',
    },
    headline: {
        fontWeight: 'bold',
    },
    questionContainer: {
        marginBottom: 16,
    },
    question: {
        marginBottom: 8,
    },
    buttonContainer: {
        paddingBottom: 32,
    },
    blueButton: {
        backgroundColor: '#097179',
        borderRadius: 50,
        width: '50%',
        alignSelf: 'center',
        fontWeight: 'bold',
    },
    buttonCopy: {
        fontWeight: 'bold',
        color: '#fff',
    },

  };


export default ReportInfo;
