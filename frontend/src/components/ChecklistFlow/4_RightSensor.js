/*
Component to gather RightSensor Information 
Step 4 in the report checklist.
*/

import * as React from 'react';
import { View } from 'react-native';
import { DefaultTheme as PaperTheme, Provider, Text, Title, Button, RadioButton } from 'react-native-paper';

const questions = [
    {
        id: 1,
        question: 'Is the Sensor Physically Damaged?',
        options: ['Pass', 'Fail'],
        answer: null,
    },
    {
        id: 2,
        question: 'Is the Charging Port Damaged?',
        options: ['Pass', 'Fail'],
        answer: null,
    },
    {
        id: 3,
        question: 'Confirm the stability of mounting brackets or other physical fixtures.',
        options: ['Pass', 'Fail'],
        answer: null,
    },
    {
        id: 4,
        question: 'Ensure the sensor can communicate effectively with its receiver both through the hub and over bluetooth.',
        options: ['Pass', 'Fail'],
        answer: null,
    },
    {
        id: 5,
        question: 'Check Data Transfer Capabilities.',
        options: ['Pass', 'Fail'],
        answer: null,
    },
    {
        id: 6,
        question: 'Inspect the entire length of the sensor cable for damage or fraying.',
        options: ['Pass', 'Fail'],
        answer: null,
    },
    // Add more questions and options as needed
];

/*
Component to get user information about the RightSensor.

Navigation is a navigation object
Route contains answers to previous checklist components.
*/
const RightSensor = ({ navigation, route }) => {
    //user's answers
    const [answers, setAnswers] = React.useState([]);

    //handle when a user enters or changes an answer
    const handleOptionChange = (questionId, option) => {
        const updatedQuestions = questions.map((question) => {
            if (question.id === questionId) {
                question.answer = option;
            }
            return question;
        });

        setAnswers(updatedQuestions);
    };

    //navigate to the next component, and pass along the user's responses
    const submitAnswers = () => {
        // Handle the answers array containing the answers
        console.log(answers);
        navigation.navigate("Headset Inspection", {report1: route.params.report1, report2: route.params.report2, report3: route.params.report3, report4: answers});

    };

    return (
        <Provider theme={ChecklistTheme}>
            <View style={ChecklistTheme.formContainer}>
                <Text variant="headlineMedium">Right Sensor Inspection:</Text>
                {questions.map((question) => (
                    <View key={question.id} style={ChecklistTheme.questionContainer}>
                        <Title style={ChecklistTheme.question}>{question.question}</Title>
                        {question.options.map((option) => (
                            <View key={option} style={ChecklistTheme.radioButton}>
                                <RadioButton
                                    value={option}
                                    status={question.answer === option ? 'checked' : 'unchecked'}
                                    onPress={() => handleOptionChange(question.id, option)}
                                    testID={`radioButton${question.id}-${option}`}
                                />
                                <Text>{option}</Text>
                            </View>
                        ))}
                    </View>
                ))}

                <View style={ChecklistTheme.buttonContainer}>
                    <Button mode="contained" onPress={submitAnswers} style={ChecklistTheme.blueButton} testID="ContinueButton">
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
        onBackground: '#000000',
        onSurface: '#000000',
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
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
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

export default RightSensor;
