function isObject(argument) {
  return argument instanceof Object && Object.prototype.toString.call(argument) === '[object Object]';
}

function parseGO(argument) {
  if (!isObject(argument.tvs)) {
    if (__DEV__) {
      console.warn('tvs !defined: id-' + argument.id);
    }
    return null;
  }
  // else
  let tvs = argument.tvs;
  let data = {
    id: argument.id,
    category: argument.category,
    icon: argument.legend_icon,
    legend_icon: argument.legend_icon
  };

  Object.keys(tvs).map((key) => {
    if(!data.hasOwnProperty(key)){
      data[key] = tvs[key] || null;
    }
  });

  return data;
}

// allow to revert coordinates
function parseCoords(string) {
  let originalGeometry = string.split(',');
  return originalGeometry.map((el, i, arr) => {
    return arr[arr.length - 1 - i];
  });
}

export default class mapService {
  constructor(props) {
    props = props || {};
    this.provider = null;
    this.source = null;

    this.autoAdjustBounds = true;

    Object.keys(props).map((prop) => {
      if (!this.hasOwnProperty(prop)) {
        this[prop] = props[prop];
      }
    }, this);
  }

  setProvider(provider) {
    this.provider = provider;
    return this;
  }

  setSource(source) {
    this.source = source;
    return this;
  }

  flushMap() {
    this.provider.geoObjects.removeAll();
    return this;
  }

  flushMapByGOName(name) {
    let GOs = this.provider.geoObjects;
    GOs.each((go) => {
      if (go && go.options.getName() === name) {
        if (GOs === go.getParent()) {
          GOs.remove(go);
        }
      }
    });
    return this;
  }

  renderRoute(routeData) {
    var refPoints = [];
    routeData = JSON.parse(routeData);

    routeData.map((el) => {
      refPoints.push(parseCoords(el.coordinates));
    });

    let multiRoute = new ymaps.multiRouter.MultiRoute({
      referencePoints: refPoints,
      params: {
        routingMode: 'masstransit'
        // this doesn't work properly
        // TODO: should check this out
        // boundsAutoApply: true,
      }
    });

    multiRoute.events.add('update', () => {
      this.provider.setBounds(multiRoute.getBounds());
    });

    this.provider.geoObjects.add(multiRoute);

    return this;
  }

  getCurrentBounds(){
    return this.provider.geoObjects.getBounds();
  }

  renderGeoObjects(list) {

    list.map((el) => {
      let data = parseGO(el);

      if (data) {
        this.renderGO(data);
      }
    }, this);

    let newBounds = this.getCurrentBounds();
    this.autoAdjustBounds && newBounds && this.provider.setBounds(newBounds);

    return this;
  }

  renderGO(data) {
    let mark = this.Mark.getMark(data);
    if (mark) {
      this.addGO(mark);
    }
    return this;
  }

  addGO(mark) {
    this.provider.geoObjects.add(mark);
    return this;
  }
}
