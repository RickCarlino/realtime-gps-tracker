var Compass,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Compass = (function() {
  function Compass(options) {
    if (options == null) {
      options = {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 100000
      };
    }
    this._parseGPS = __bind(this._parseGPS, this);
    this.lat = 0;
    this.lng = 0;
    this.alt = 0;
    this.acc = 0;
    this.altAcc = 0;
    this.hdg = 0;
    this.spd = 0;
    this._grabGPS(options);
  }

  Compass.prototype._grabGPS = function(options) {
    return navigator.geolocation.watchPosition(this._parseGPS, this._parseErr, options);
  };

  Compass.prototype._parseGPS = function(position) {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    this.alt = position.coords.altitude;
    this.acc = position.coords.accuracy;
    this.altAcc = position.coords.altitudeAccuracy;
    this.hdg = position.coords.heading;
    return this.spd = position.coords.speed;
  };

  Compass.prototype._parseErr = function(err) {
    switch (err.code) {
      case 1:
        this.error = 'Permission denied by user';
        break;
      case 2:
        this.error = 'Cant fix GPS position';
        break;
      case 3:
        this.error = 'GPS is taking too long to respond';
        break;
      default:
        this.error = 'Well, this is embarassing...';
    }
    return console.log(this.error);
  };

  Compass.prototype.stop = function() {
    return navigator.geolocation.clearWatch(_grabGPS);
  };

  return Compass;

})();

window.compass = new Compass();