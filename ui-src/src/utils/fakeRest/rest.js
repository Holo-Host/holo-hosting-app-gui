import fetchMock from 'fetch-mock';
import FakeRest from 'fakerest';
import sinon from 'sinon';

export default () => {
  const restServer = new FakeRest.Server('http://localhost:8800');
  if (window) {
      window.restServer = restServer; // give way to update data in the console
  }
  restServer.toggleLogging(); // logging is off by default, enable it
  const data = {};
  restServer.init(data);
  // console.log("restServer", restServer);

  const server = sinon.fakeServer.create();
  server.autoRespond = true;
  server.respondWith(restServer.getHandler());
  // console.log("SINON server", server)

  return restServer;
};
