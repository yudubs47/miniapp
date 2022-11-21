// 绘制矩形
type DrawRectangleOptions = {
  width: number;
  height: number;
  radius?: number;
  type?: 'fill' | 'stroke';
  color?: string;
  y?: number;
  x?: number;
}
// 加载远程图片
type RemoteImgOptions = {
  src: string;
  width: number;
  height: number;
  x: number;
  y: number;
}
// type 文字绘制配置
type FillTextOptions = {
  fontStyle?: string;
  fontWeight?: string | number;
  fontSize: number;
  fontFamily?: string;

  color?: string;
  x: number;
  y: number;
}

// TODO 绘制类型暂时写死2d
// TODO 定位可增加bottom right, 通过画布尺寸计算
// TODO 尺寸目前只支持px
// TODO 小程序RenderingContext类型没有更新~~~~
export default class Draw {
  canvas: WechatMiniprogram.Canvas;
  ctx: WechatMiniprogram.CanvasContext & { textBaseline: string };
  width: number;
  height: number;
  constructor(canvas: WechatMiniprogram.Canvas, options: {height: number; width: number;}) {
    this.canvas = canvas
    canvas.width = options.width
    canvas.height = options.height
    this.ctx = this.canvas.getContext('2d')
    this.width = canvas.width // 画布宽
    this.height = canvas.height // 画布长
  }
  async drawRemoteImg({ src, width, height, x, y }: RemoteImgOptions) {
    const image = this.canvas.createImage()
    await new Promise(resolve => {
      image.onload = resolve
      image.src = src
    })
    this.ctx.drawImage(image as any, x, y, width, height)
  }
  private transCoordinate(offsetX: number = 0, offsetY: number = 0) {
    return (x: number, y: number): [number, number] => {
      return [x + offsetX, y + offsetY]
    }
  }
  drawRectangle = ({ width, height, radius = 0, type = 'fill', color = '#ffffff', y = 0, x = 0 }: DrawRectangleOptions) => {
    const trans = this.transCoordinate(x, y)
    this.ctx.beginPath();
    this.ctx.moveTo(...trans(0, radius));
    this.ctx.arcTo(...trans(0, 0), ...trans(radius, 0), radius)
    this.ctx.lineTo(...trans(width - radius, 0))
    this.ctx.arcTo(...trans(width, 0), ...trans(width, radius), radius)
    this.ctx.lineTo(...trans(width, height - radius))
    this.ctx.arcTo(...trans(width, height), ...trans(width - radius, height), radius)
    this.ctx.lineTo(...trans(radius, height))
    this.ctx.arcTo(...trans(0, height), ...trans(0, height - radius), radius)
    this.ctx.lineTo(...trans(0, radius))
    this.ctx.closePath()
    
    if(type === 'fill') {
      this.ctx.fillStyle = color;
      this.ctx.fill()
    } else {
      this.ctx.strokeStyle = color;
      this.ctx.stroke()
    }
  }
  private concatFontStyle(styles: FillTextOptions){
    const { fontStyle = '', fontWeight = '', fontSize, fontFamily = '' } = styles
    const str = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`
    return str.trim().replace(/\s+/g, ' ')
  }
  drawText(text: string, options: FillTextOptions) {
    const { color = '#000000', x, y } = options
    this.ctx.fillStyle = color
    // TODO 文字基线暂时写死top, 好算位置~.~
    this.ctx.textBaseline = 'top'
    this.ctx.font = this.concatFontStyle(options)
    this.ctx.fillText(text, x, y)
  }
  clear(){
    this.ctx.clearRect(0, 0, this.width, this.height)
  }
}

