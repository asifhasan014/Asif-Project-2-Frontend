import { HomeRountingModule } from './home-rounting.module';

describe('HomeRountingModule', () => {
  let homeRountingModule: HomeRountingModule;

  beforeEach(() => {
    homeRountingModule = new HomeRountingModule();
  });

  it('should create an instance', () => {
    expect(homeRountingModule).toBeTruthy();
  });
});
