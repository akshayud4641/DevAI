import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  public userTokenKey = "userToken";
  public userRefreshTokenKey = "userRefreshToken";
  public userInfo = "userInfo";
}
