'use strict'
/*
 * This example demonstates nested boolean logic - e.g. (x OR y) AND (a OR b).
 *
 * Usage:
 *   node ./examples/InterceptorRule1.js
 *
 * For detailed output:
 *   DEBUG=json-rules-engine node ./examples/InterceptorRule1.js
 */

require('colors')

const express = require('express');
const Joi = require('joi'); //used for validation
const app = express();
app.use(express.json());

const port = 9080;
const server = app.listen(port, () => console.log(`Listening on port ${port}..`));

//CREATE Request Handler
app.post('/tmf-api/InterceptorObj', (req, res)=> {
 
let { error, value } = validateBook(req.body);
  if (error) {
    res.status(400).send("Request Payload Format Invalid!")
    return;
  }

/*
START Rules
*/

const { Engine } = require('json-rules-engine')
let Rule = require('json-rules-engine').Rule
const fs = require('fs/promises');

async function start () {

  let ruleData = "";
  try {
    ruleData = await fs.readFile('/usr/src/app/rules/rule2.json', { encoding: 'utf8' });
    //ruleData = await fs.readFile('../rules/rule2.json', { encoding: 'utf8' });
  } catch (err) {
    console.log(err)
  }
  /**
   * Setup a new engine
   */
  const engine = new Engine()

  // define a rule for detecting if request should be Intercepted:
  // ("oc" field value is in array) AND ("fta" == '610')
  const ruleObj = {
    conditions: {
        all: [{
          fact: 'oc',
          operator: 'in',
          value: [24735, 0, 111, 222, 333] 
        }, {
          fact: 'fta',
          operator: 'equal',
          value: 610
        }]
    },
    event: { 
      type: 'Intercepted',
      params: {
        message: 'Operation Should be Intercepted!'
      }
    }
  }

let ruleFileObj = new Rule(ruleData)
engine.addRule(ruleFileObj);
//engine.addRule(ruleObj);

engine.on('success', (event, almanac, ruleResult) => {
    console.log("Operation Should be Intercepted!".red)
    res.status(200).send("Operation Should be Intercepted!")
    })

engine.on('failure', (event, almanac, ruleResult) => {
  console.log("DO NOT Intercept!".red)
  res.status(400).send("DO NOT Intercept!")
  
  })
  /**
   * define the facts
   * note: facts may be loaded asynchronously at runtime; see the advanced example below
   */
  const facts = {
    oc: 24735,
    fta: 611
  }

  const { events } = await engine.run(req.body)

  //events.map(event => console.log(event.params.message.red))

  return events;
} //end async start function

let { resp } =  start();

/*
END Rules
*/

//res.send(events.map(event => event.params.message));

});



function validateBook(book) {

  const schema = Joi.object({

      oc: Joi.number().integer().required(),
      fta: Joi.number().integer().required(),
      FirstName: Joi.string(),
      LastName: Joi.string(),
      StreetAddress: Joi.string(),
      PackageName: Joi.string(),
      services: Joi.string(),
      RequestType: Joi.string()
  });

  //console.log(book);
  return schema.validate(book);
}
