/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This is the lambda function for Alexa to solve complex math problems with the help of Wolfram Alpha
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
        if (polySlot && polySlot.value) {
            polyName = polySlot.value.toLowerCase();
        }

        const cardTitle = this.t('DISPLAY_CARD_TITLE', this.t('SKILL_NAME'), polyName);
        var myPolys = this.t('POLYNOMIALS');
        var polynomial = myPolys[polyName];

        if (polynomial) {
            this.attributes.speechOutput = polynomial;
            this.attributes.repromptSpeech = this.t('POLYNOMIAL_REPEAT_MESSAGE');
            this.emit(':askWithCard', polynomial, this.attributes.repromptSpeech, cardTitle, polynomial);
        } else {
            var speechOutput = this.t('POLYNOMIAL_NOT_FOUND_MESSAGE');
            var repromptSpeech = this.t('POLYNOMIAL_NOT_FOUND_REPROMPT');
            if (polyName) {
                speechOutput += this.t('POLYNOMIAL_NOT_FOUND');
            } else {
                speechOutput += this.t('POLYNOMIAL_NOT_FOUND');
            }
            speechOutput += repromptSpeech;

            this.attributes.speechOutput = speechOutput;
            this.attributes.repromptSpeech = repromptSpeech;

            this.emit(':ask', speechOutput, repromptSpeech);
        }
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
            WELCOME_MESSAGE: "Welcome to %s. You can get help with a problem like, find the integral of two x ... Now, what can I help you with.",
            WELCOME_REPROMT: 'For instructions on what you can say, please say help me.',
            DISPLAY_CARD_TITLE: '%s  - Polynomial for %s.',
            HELP_MESSAGE: "You can get help with math problems such as, find the derivative, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can say things like, what is the derivative, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!',
            RECIPE_REPEAT_MESSAGE: 'Try saying repeat.',
            RECIPE_NOT_FOUND_MESSAGE: "I\'m sorry, I currently do not know ",
            //RECIPE_NOT_FOUND_WITH_ITEM_NAME: 'the recipe for %s. ',
            //RECIPE_NOT_FOUND_WITHOUT_ITEM_NAME: 'that recipe. ',
            RECIPE_NOT_FOUND_REPROMPT: 'What else can I help with?',
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
