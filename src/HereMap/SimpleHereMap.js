// const e = React.createElement;

// class SimpleHereMap extends React.Component {
//   componentDidMount() {
//     var platform = new H.service.Platform({
//         app_id: 'TAhAfs7Urn7KfhfOvTha',
//         app_code: '5HxFUxQjB3cDPpbRtrnQchlzpWOhRqznMMg1-U6MSCk',
//         })

//     var layers = platform.createDefaultLayers();
//     var map = new H.Map(
//         document.getElementById('map'),
//         layers.normal.map,
//         {
//             center: {lat: 42.345978, lng: -83.0405},
//             zoom: 12,
//         });

//     var events = new H.mapevents.MapEvents(map);
//     var behavior = new H.mapevents.Behavior(events);
//     var ui = H.ui.UI.createDefault(map, layers);
//   }

//   render() {
//       return e('div', {"id": "map"});
//   }
// }

// const domContainer = document.querySelector('#root');
// ReactDOM.render(e(SimpleHereMap), domContainer);