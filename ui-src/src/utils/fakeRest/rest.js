import fetchMock from 'fetch-mock';
import FakeRest from 'fakerest';
import sinon from 'sinon';

const data = {
    'reviews': [
        { id: 0, first_name: 'Leo', last_name: 'Tolstoi' },
        { id: 1, first_name: 'Jane', last_name: 'Austen' }
    ],
    'posts': [
        { id: 0, author_id: 0, title: 'Anna Karenina', teaser: 'Supsense' },
        { id: 1, author_id: 0, title: 'War and Peace' },
        { id: 2, author_id: 1, title: 'Pride and Prejudice' },
        { id: 3, author_id: 1, title: 'Sense and Sensibility' }
    ]
};

export default () => {
  console.log("inside the fakeRest");
  // const restServer = new FakeRest.FetchServer('http://localhost:8800');
  // if (window) {
  //     window.restServer = restServer; // give way to update data in the console
  // }
  // restServer.toggleLogging(); // logging is off by default, enable it
  // restServer.init(data);
  // console.log("restServer", restServer);
  // fetchMock.mock('begin:http://localhost:8800', restServer.getHandler());

  // const req = new XMLHttpRequest();
  // req.open("GET", "/posts", false);
  // req.send(null);
  // console.log("--->",req.response);

  // const req = new XMLHttpRequest();
  // req.open("POST", "/posts", false);
  // req.send(JSON.stringify({ author_id: 1, title: 'Emma' }));
  // console.log(req.responseText);

  // return () => fetchMock.restore();



  const restServer = new FakeRest.Server('http://localhost:8800');
  if (window) {
      window.restServer = restServer; // give way to update data in the console
  }
  restServer.toggleLogging(); // logging is off by default, enable it
  restServer.init(data);
  console.log("restServer", restServer);

  // restServer.addRequestInterceptor(function(request) {
  //     var start = (request.params._start - 1) || 0;
  //     var end = request.params._end !== undefined ? (request.params._end - 1) : 19;
  //     request.params.range = [start, end];
  //     return request; // always return the modified input
  // });

  restServer.addResponseInterceptor(function(response) {
      response.body = { data: response.body, status: response.status };
      return response; // always return the modified input
  });
  // set default query, e.g. to force embeds or filters
  // restServer.setDefaultQuery(function(resourceName) {
  //     if (resourceName == 'reviews') return { embed: ['posts'] }
  //     if (resourceName == 'posts') return { filter: { published: true } }
  //     return {};
  // })

  // restServer.setBatchUrl('/batch');
  // const restServer2 = new FakeRest.Server('http://localhost:9300');

  // Set data collection by collection - allows to customize the identifier name
  const happsCollection = new FakeRest.Collection([], '_id');
  happsCollection.addOne({ image: 'https://DC', thumbnail: '/', price:"x", width:"5ft", height:"3ft", description:'marvel will never compare...'}); // { _id: 0, image: 'Leo', thumbnail: 'Tolstoi' }
  happsCollection.addOne({ image: 'https://Marvel', thumbnail: '/', price:"x", width:"4ft", height:"8ft",  description:'DC will never win...'}); // { _id: 1, image: 'Jane', thumbnail: 'Austen' }

  // collections have autoincremented identifier but accept identifiers already set
  // happsCollection.addOne({ _id: 3, first_name: 'Super', last_name: 'man' }); // { _id: 3, first_name: 'Marcel', last_name: 'Proust' }

  // collections are mutable
  happsCollection.updateOne(0, { last_name: 'Forever' }); // { _id: 1, first_name: 'Jane', last_name: 'Doe' }
  // happsCollection.removeOne(3); // { _id: 3, first_name: 'Marcel', last_name: 'Proust' }

  restServer.addCollection('happs', happsCollection);
  // console.log("reviewsCollection >", reviewsCollection);

  const server = sinon.fakeServer.create();
  server.autoRespond = true;

  server.respondWith(restServer.getHandler());
  // console.log("SINON server", server)
  console.log("REST SERVER 1-ONLY >", restServer);
};
