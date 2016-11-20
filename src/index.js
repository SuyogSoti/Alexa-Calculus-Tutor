/**This is the lambda function for Alexa to solve complex math problems with the help of Wolfram Alpha
 * Created by Stevan Maksimovic, Suyog Soti, and Ryan Loi for the Denver Broncos Hackathon
 * This function only supports US English
 * The Intent Schema, Custom Slot and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/
 **/

'use strict';

const Alexa = require('alexa-sdk');
const polynomials = require('./polynomials');

const APP_ID = undefined; // TODO replace with your app ID (OPTIONAL).


const handlers = {
    var fs = require('fs');
    fs.appendFile("past_problems.txt", "", function(err) {
        if(err) {
            return console.log(err);
        }
    });
    'NewSession': function () {
        this.attributes.speechOutput = this.t('WELCOME_MESSAGE', this.t('SKILL_NAME'));
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        this.attributes.repromptSpeech = this.t('WELCOME_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'CalcIntent': function () {
        var polySlot = this.event.request.intent.slots.Polynomial;
        var polyName;
	var opSlot = this.event.request.intent.slots.Operation;
	var opName = "";
	var lowSlot = this.event.request.intent.slots.LowerBound;
	var lowName = "";
	var upSlot = this.event.request.intent.slots.UpperBound;
	var upName = "";
    console.log("Poly: " + polySlot);
    console.log("OPSlot: "+opSlot);
    if (polySlot && polySlot.value) {
        polyName = polySlot.value.toLowerCase();
        if(opSlot.value){
            opName = opSlot.value.toLowerCase();
        }
        if (lowSlot.value){
            lowName = lowSlot.value.toLowerCase();
        }
        if (upSlot.value) {
            upName = upSlot.value.toLowerCase();
        }
    }
        var parentof = this;
        console.log("OP: "+opName);
        console.log("EQ: "+polyName);
        console.log("lower: "+lowName);
        console.log("upper: "+upName);
        polynomials(opName, polyName, lowName, upName, function(ans) {
            // op = opName;
            // express = polyName;

            const cardTitle = parentof.t('DISPLAY_CARD_TITLE', parentof.t('SKILL_NAME'), polyName);
            var myPolys = parentof.t('POLYNOMIALS');
            while (ans.indexOf("<") > -1){
                ans = ans.replace("<", " less than ");
            }
            while (ans.indexOf(">") > -1){
                ans = ans.replace(">", " greater than ");
            }
            console.log("ANS:" + ans);
            if (ans) {
                parentof.attributes.speechOutput = ans;
                parentof.attributes.repromptSpeech = parentof.t('POLYNOMIAL_REPEAT_MESSAGE');
                parentof.emit(':askWithCard', ans, parentof.attributes.repromptSpeech, cardTitle, ans);
            } else {
                var speechOutput = parentof.t('POLYNOMIAL_NOT_FOUND_MESSAGE');
                var repromptSpeech = parentof.t('POLYNOMIAL_NOT_FOUND_REPROMPT');
                if (polyName) {
                    speechOutput += parentof.t('POLYNOMIAL_NOT_FOUND');
                } else {
                    speechOutput += parentof.t('POLYNOMIAL_NOT_FOUND');
                }
                speechOutput += repromptSpeech;

                parentof.attributes.speechOutput = speechOutput;
                parentof.attributes.repromptSpeech = repromptSpeech;

                parentof.emit(':ask', speechOutput, repromptSpeech);
            }
        });
    },
    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

const languageStrings = {
    'en-US': {
        translation: {
            POLYNOMIALS: polynomials.POLYNOMIAL_EN_US,
            SKILL_NAME: 'Alexa Calculus Tutor',
            WELCOME_MESSAGE: "Welcome to %s. You probably need help with simple problems like integrating two x ... So, what do you want.",
            WELCOME_REPROMT: 'What\'s the matter? Need some help speaking? No wonder you need a tutor.',
            DISPLAY_CARD_TITLE: '%s  - Polynomial for %s.',
            HELP_MESSAGE: "I can help you with concepts such as differentiation, integration, optimization ... did you get that, or were those words too big for you?",
            HELP_REPROMT: "You can say things like, what is the derivative, or you can say exit and just give up like you usually do.",
            STOP_MESSAGE: 'See you later.',
            POLYNOMIAL_REPEAT_MESSAGE: 'Try saying repeat.',
            POLYNOMIAL_NOT_FOUND_MESSAGE: "I\'m afraid what you just said, like everything you usually say, was unintelligible ",
            POLYNOMIAL_NOT_FOUND_REPROMPT: 'Try not to confuse yourself this time.',
        },
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
