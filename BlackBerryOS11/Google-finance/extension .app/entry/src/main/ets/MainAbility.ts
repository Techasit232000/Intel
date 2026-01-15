import Ability from '@ohos.app.ability.UIAbility';
import Window from '@ohos.window';

export default class MainAbility extends Ability {
  onWindowStageCreate(windowStage: Window.WindowStage) {
    windowStage.loadContent('pages/Index', (err, data) => {
      if (err.code) {
        console.error('Failed to load content. Cause:' + JSON.stringify(err));
        return;
      }
      console.info('Content loaded successfully.');
    });
  }
}