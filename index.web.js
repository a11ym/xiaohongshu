import { AppRegistry } from 'react-native';
// import App from './app/pages/Index/index';
// import App from './app/test/Apptest';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('app-root'),
});
