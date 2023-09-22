'use strict';

if (process.env.DEBUG === '1') {
  require('inspector').open(9229, '0.0.0.0', false);
  process.env.NODE_DEBUG = 'request';
}

const Homey = require('homey');
const StravaAPI = require('strava-v3');

class StravaApp extends Homey.App {

  async onInit() { 
  }

  async get(query) {
    this.log('GET called met ' + JSON.stringify(query));

    var hub = new Object();
    hub["hub.challenge"] = query["hub.challenge"];
    
    return hub;
  }

  async getGear(){
    this.log('GET Gear called');

    const device = this.homey.drivers.getDriver('stravauser').getDevices()[0];
    if (device) {
      let gear = device.gearMetrics;
      gear = device.getGear();

      return gear;
    }
  }

  async post(body) {
    this.log('POST called met ' + JSON.stringify(body));

    const device = this.homey.drivers.getDriver('stravauser').getDevices().find(x => x.getData().id == body.owner_id);
    if (device){
      device.upsertActivity(body);
    }
  }
} module.exports = StravaApp;
