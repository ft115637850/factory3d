var meterRef;
var socket;
function init() {
  dataModel = new ht.DataModel();
  g3d = new ht.graph3d.Graph3dView(dataModel);
  g3d.setEye(-500, 800, 2000);
  g3d.setGridVisible(true);
  g3d.getView().style.background = '#4C7BBB';
  g3d.addToDOM();

  ht.Default.loadObj('obj/meter.obj', 'obj/meter.mtl', {
    center: true,
    prefix: 'obj/',
    shape3d: 'meter',
    finishFunc: function (modelMap, array, rawS3) {
      if (modelMap) {

        modelMap.body.blend = {
          func: function (data) {
            if (data.a('value') > 80) {
              return 'red';
            }
            return null;
          }
        };

        modelMap.pointer.mat = {
          func: function (data) {
            var start = Math.PI * 0.736,
              range = Math.PI * 1.46,
              angle = start - range * data.a('value') / 100;
            return ht.Default.createMatrix([
              { t3: [0, -75, 0] },
              { r3: [Math.PI / 4, 0, 0] },
              { r3: [0, 0, angle] },
              { r3: [-Math.PI / 4, 0, 0] },
              { t3: [0, 75, 0] }
            ]);
          }
        };
        modelMap.pointer.color = {
          func: function (data) {
            return toColor(data.a('value'));
          }
        };

        meter = new ht.Node();
        meter.s({
          'shape3d': 'meter',
          'shape3d.scaleable': false
        });
        meter.a({
          value: 0
        });
        meter.s3(rawS3);
        meter.p3(0, rawS3[1] / 2, 0);
        dataModel.add(meter);

        createFormPane();

        var oldEye = g3d.getEye().slice(0),
          oldCenter = g3d.getCenter().slice(0),
          newEye = [100, 200, 400],
          newCenter = meter.p3();

        ht.Default.startAnim({
          delay: 100,
          duration: 1200,
          easing: function (t) {
            return (t *= 2) < 1 ? 0.5 * t * t : 0.5 * (1 - (--t) * (t - 2));
          },
          action: function (k) {
            g3d.setEye(
              oldEye[0] + (newEye[0] - oldEye[0]) * k,
              oldEye[1] + (newEye[1] - oldEye[1]) * k,
              oldEye[2] + (newEye[2] - oldEye[2]) * k
            );
            g3d.setCenter(
              oldCenter[0] + (newCenter[0] - oldCenter[0]) * k,
              oldCenter[1] + (newCenter[1] - oldCenter[1]) * k,
              oldCenter[2] + (newCenter[2] - oldCenter[2]) * k
            );
          },
          finishFunc: function () {
            meter.s({
              'wf.visible': true,
              'wf.short': true,
              'wf.color': 'white'
            });
            ht.Default.startAnim({
              duration: 2500,
              easing: function (t) {
                return (2 - t) * t;
              },
              action: function (v) {
                if (v > 0.85) {
                  v = 0.85 - (v - 0.85);
                }
                var value = v * 100;
                meter.a('value', value);
                formPane.v('temp', value);
              }
            });
          }
        });
        meterRef = meter;
      }
    }
  });
}

function toColor(value) {
  if (value < 40)
    return '#00A406';
  if (value < 80)
    return '#FFCC00';
  return 'red';
}

function createFormPane() {
  formPane = new ht.widget.FormPane();
  formPane.setWidth(200);
  formPane.setHeight(60);
  formPane.getView().className = 'formpane';
  document.body.appendChild(formPane.getView());

  // formPane.addRow(['Temp',
  //   {
  //     id: 'temp',
  //     slider: {
  //       min: 0,
  //       max: 100,
  //       step: 1,
  //       value: meter.a('value'),
  //       onValueChanged: function () {
  //         var value = this.getValue();
  //         meter.a('value', value);
  //         this.setLeftBackground(toColor(value));
  //       }
  //     }
  //   }
  // ], [60, 0.1]);

  formPane.addRow([
    {
        button: {
            label: 'Connect',
            icon: 'node_icon',
            onClicked: function(e){
              connect();
            }
        }
    }
  ], [0.1]);
  formPane.addRow([
    {
        button: {
            label: 'Disconnect',
            icon: 'node_icon',
            onClicked: function(e){
              disconnect();
            }
        }
    }
  ], [0.1]);
}

function connect() {
  meterRef.a('value', 50);
  socket = new WebSocket('ws://localhost:5000/ws');
  socket.onopen = e => {
    console.log('websocket open');
    socket.send('');
    socket.send(JSON.stringify([{action: 'subscribe', tagName: 'SysTimeSec'}]));
  };

  socket.onclose = e => {
    console.log('websocket closed');
  };

  socket.onerror = e => {
    console.error('websocket error');
  };

  socket.onmessage = e => {
    if (e.data && e.data.length > 0) {
      const tagInfoList = JSON.parse(e.data);
      meterRef.a('value', tagInfoList[0].value);
    }
  };
}

function disconnect() {
  if (socket) {
    socket.close();
  }
  socket = null;
}