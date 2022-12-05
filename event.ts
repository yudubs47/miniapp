type EventCb = (data: any) => void;

class CustomizeEvent {
  constructor() {
    this.eventObj = {
      default: []
    }
  }
  eventObj: { [key: string]: EventCb[] };

  addEvent(name: string, cb: EventCb) {
    if(!cb) {
      throw new Error(`${name} 事件未回调未传入`)
    }
    if(!this.eventObj[name]) {
      this.eventObj[name] = [cb]
      return
    }
    this.eventObj[name].push(cb)
  }

  trigger(name: string, data?: any) {
    // TODO 记录未注册时间触发？？// 不做, 严格遵循先注册后触发, 参数支持回调能满足大多数场景
    if(!name) {
      throw new Error('事件名称未传入')
    }
    if(!this.eventObj[name]) {
      throw new Error(`${name} 事件未注册`)
    }
    this.eventObj[name].forEach((cb) => {
      try {
        cb(data)
      } catch(err) {
        console.error(`事件${name}回调执行失败`, err)
      }
    })
  }
  
  remove(name: string, cb?: EventCb) {
    // 不传入回调时清除所有命名空间下的回调
    if(!cb) {
      this.eventObj[name] = []
      return
    }
    if(!name) {
      throw new Error('事件名称未传入')
    }
    if(!this.eventObj[name]) {
      throw new Error(`${name} 事件未注册`)
    }
    this.eventObj[name] = this.eventObj[name].filter(curCb => cb !== curCb)
  }
}

export default CustomizeEvent
