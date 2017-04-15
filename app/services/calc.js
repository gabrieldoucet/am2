var _ = require('lodash');

angular.module('am2App')
  .factory('calc', ['planeSpecService', 'linesService', 'planeService',
    function (planeSpecService, linesService, planeService) {

      var isOptimised = function (plane, line) {
        var optis = _.get(line, 'optis');
        var opti  = (_.filter(optis, function (opti) {
          return _.isEqual(_.get(opti, 'type'), _.get(plane, 'type'));
        }))[0];

        var isOptiEco      = Math.abs(opti.config.eco - plane.config.eco) <= 2;
        var isOptiBusiness = Math.abs(opti.config.business - plane.config.business) <= 2;
        var isOptiFirst    = Math.abs(opti.config.first - plane.config.first) <= 2;
        return isOptiEco && isOptiBusiness && isOptiFirst;
      };

      var getOptiLines = function (plane) {
        return linesService.getLines().then(function (res) {
          var optiLines = [];
          _.forEach(res.data, function (line) {
            if (isOptimised(plane, line)) {
              optiLines.push(line);
            }
          });
          return optiLines;
        });
      };

      var getOptiPlanes = function (line) {
        return planeService.getPlanes().then(function (res) {
          var optiPlanes = [];

          // Filter the compatible planes for a line
          var planes     = _.filter(res.data, function (plane) {
            var compatiblePlaneTypes = _.map(line.optis, function (opti) {
              return opti.type;
            });
            return _.includes(compatiblePlaneTypes, plane.type);
          });

          _.forEach(planes, function (plane) {
            if (isOptimised(plane, line)) {
              optiPlanes.push(plane);
            }
          });
          return optiPlanes;
        });
      };

      return {
        isOptimised: isOptimised,
        getOptiLines: getOptiLines,
        getOptiPlanes: getOptiPlanes
      };
    }])
;