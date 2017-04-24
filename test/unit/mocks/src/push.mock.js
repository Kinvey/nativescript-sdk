import { Push } from 'src/push';

class PushMock extends Push {
  isSupported() {
    return true;
  }
}

// Export
export { PushMock as PushMockClass };
export default new PushMock();
