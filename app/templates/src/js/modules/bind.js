import KintonePluginGenerator from "../../../../../src";

export default function({ events, callback }) {
  return kintone.events.on(
    events,
    function(event) {
      return callback(event);
    }
  );
}
