
import GetTopAppsByHostUseCase from './Application/Service/GetTopAppsByHostUseCase';
import AddAppToHostsUseCase from './Application/Service/AddAppToHostsUseCase';
import RemoveAppFromHostsUseCase from './Application/Service/RemoveAppFromHostsUseCase';
import MemoryDataRepository from './Data/MemoryDataRepository';
import VanillaRenderService from './Render/VanillaRenderService';

import App from './Common/App';

window.onload = function() {
    const DR = new MemoryDataRepository();

    // Render scene
    let hosts = DR.getHosts()
    const Renderer = new VanillaRenderService();
    Renderer.renderScene(hosts);

    // Use cases
    const exampleHost = hosts[Object.keys(hosts)[0]]
    const exampleHost2 = hosts[Object.keys(hosts)[1]]

    const getTopAppsByHostUseCase = new GetTopAppsByHostUseCase(DR);
    console.log('GetTopAppsByHostUseCase - ', getTopAppsByHostUseCase.run(exampleHost));

    const addAppToHostsUseCase = new AddAppToHostsUseCase(DR);
    const exampleApp = new App('test', [], 10, 99, []);
    addAppToHostsUseCase.run([exampleHost, exampleHost2], exampleApp);
    console.log('AddAppToHostsUseCase - (Added app with name test)', getTopAppsByHostUseCase.run(exampleHost));

    const removeAppFromHostsUseCase = new RemoveAppFromHostsUseCase(DR);
    removeAppFromHostsUseCase.run([exampleHost, exampleHost2], exampleApp)
    console.log('RemoveAppToHostsUseCase - (Removed app created previously)', getTopAppsByHostUseCase.run(exampleHost));
}
