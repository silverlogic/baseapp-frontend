export type RouterChainable = {
  push: sinon.SinonStub
  back: sinon.SinonStub
  forward: sinon.SinonStub
  refresh: sinon.SinonStub
  replace: sinon.SinonStub
  prefetch: sinon.SinonStub
  pathname: string
}
