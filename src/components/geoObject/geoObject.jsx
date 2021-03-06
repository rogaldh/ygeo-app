import './geoObject.styl';
import React from 'react';
import {Link} from 'react-router';
import IMediaSlider from '../iMediaSlider/imediaSlider.jsx';
import Scrollbar from '../geminiScrollbar/geminiScrollbar.jsx';
import {animateRef} from '../../helpers/animationHelpers.js';

export default class geoObject extends React.Component {

  componentDidMount() {
    animateRef.call(this, 'title', 1000, ['slideDown']);
    animateRef.call(this, 'info', 600, ['slideDown']);
    animateRef.call(this, 'routes', 600, ['slideDown']);
    animateRef.call(this, 'content', 1300, ['geoObject--active']);
  }

  render(){
    if(this.props.Data){
      var {id, pagetitle, longtitle, content, tvs} = this.props.Data;
    }

    if(tvs){
      var {schedule, schedule_time, address, phone} = tvs;
    }

    let ns = 'geoObject';
    return <section className={ns + '__section'}>
      <div className={ns + '__header'}>
        <div ref="title" className={ns + '__title none'}>
          {longtitle || pagetitle}
          <span className={ns + '__address'} dangerouslySetInnerHTML={{__html: String(address || '')}}></span>
        </div>
      </div>

      <div className={ns + '__wrapper slideRight'}>
        <Link to="app" className={ns + '__close'}></Link>

        <div className={ns + '__slider'}>
          <IMediaSlider id={Number(id)} {...this.props} />
        </div>

        <div ref="info" className={ns + '__info'}>
          <div className={ns + '__dest'}>
            <span className={ns + '__h'} dangerouslySetInnerHTML={{__html: String(address || '')}}></span>
            <div dangerouslySetInnerHTML={{__html: String(phone || '')}}></div>
          </div>
          <div className={ns + '__time'}>
            <span className={ns + '__h'} dangerouslySetInnerHTML={{__html: String(schedule_time || '')}}></span>
            <div dangerouslySetInnerHTML={{__html: String(schedule || '')}}></div>
          </div>
        </div>

        <div ref="routes" className="geoObject__routes">
          <span className={ns + '__routeDesc'}>Как добраться:</span>
          <span className="geoObject__route route__car"><Link to="route" params={{rId: 'route_auto'}}>На авто</Link></span>
          <span className="geoObject__route route__walk"><Link to="route" params={{rId: 'route_walk'}}>Пешком</Link></span>
          <span className="geoObject__route route__bus"><Link to="route" params={{rId: 'route_bus'}}>Транспортом</Link></span>
        </div>

        <Scrollbar ref="content">
          <div className={ns + '__content'} dangerouslySetInnerHTML={{__html: String(content || '')}}></div>
        </Scrollbar>
      </div>
    </section>;
  }
}
