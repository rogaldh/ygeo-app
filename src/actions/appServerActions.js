'use strict';
import Dispatcher from '../core/dispatcher.js';
import ActionTypes from '../constants/actions.js';

export default {
  getGeoObject(data) {
    Dispatcher.handleServerAction({
      data: data.results,
      actionType: ActionTypes.GO_GET
    });
  },

  didSearchGeoObjects(data) {
    Dispatcher.handleServerAction({
      data: data.results,
      actionType: ActionTypes.GO_SEARCH
    });
  },

  didGetTime(data) {
    Dispatcher.handleServerAction({
      data: data.object,
      actionType: ActionTypes.TIME
    });
  },

  didGetWeather(data) {
    Dispatcher.handleServerAction({
      data,
      actionType: ActionTypes.WEATHER
    });
  },

  didGetBanner(data) {
    Dispatcher.handleServerAction({
      data,
      actionType: ActionTypes.BANNER
    });
  }
};
