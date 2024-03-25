/*
Component to gather Headset Information 
Step 6 in the report checklist.
*/

import * as React from 'react';
import { View } from 'react-native';
import { DefaultTheme as PaperTheme, Provider, Text, Title, Button, RadioButton } from 'react-native-paper';

const questions = [
    {
        id: 1,
        question: 'Inspect the Charger for any physical damage or deformities',
        options: ['Pass', 'Fail'],
        answer: null,
    },
    {
        id: 2,
        question: 'Check the connectors and cables physically, Look for fraying, corrosion, dirt/debris lodged in ports, and cable flexibility.',
        options: ['Pass', 'Fail'],
        answer: null,
    },
    {
        id: 3,
        question: 'Can the Hub charge from all ports.',
        options: ['Pass', 'Fail'],
        answer: null,
    },
    {
        id: 4,
        question: 'Hub does not overheat while charging.',
        options: ['Pass', 'Fail'],
        answer: null,
    },
    {
        id: 5,
        question: 'Do all Ports on the Hub Transfer Data?',
        options: ['Pass', 'Fail'],
        answer: null,
    },
    // Add more questions and options as needed
];

/*
Component to get user information about the Hub.

Navigation is a navigation object
Route contains answers to previous checklist components.
*/
const Hub = ({ navigation , route}) => {
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
        navigation.navigate("Inspection Flow Complete", {report1: route.params.report1, report2: route.params.report2, report3: route.params.report3, report4: route.params.report4, 
            report5: route.params.report5, report6: answers
        });

    };

    return (
        <Provider theme={ChecklistTheme}>
            <View style={ChecklistTheme.formContainer}>
                <Text variant="headlineMedium">Charging Hub Inspection:</Text>
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
                    <Button mode="contained" onPress={submitAnswers} style={ChecklistTheme.blueButton} testID='ContinueButton'>
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

export default Hub;
