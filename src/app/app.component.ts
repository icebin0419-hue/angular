import { Component, OnInit } from '@angular/core';
import { HttpClientService } from './http-services/http-services.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  locationsData: any;
  locationArray: any[] = [];

  chooseLocationName: string = '';
  chooseLocationData: any;

  chooseWeatherName: string = '';
  chooseWeatherData: any;

  constructor(private httpClientService: HttpClientService) {}

  ngOnInit(): void {
    this.httpClientService.getApi().subscribe({
      next: (res: any) => {
        this.locationsData = res.records.Locations[0];
        this.locationArray = this.locationsData.Location;
      },
      error: (err) => console.error('API 錯誤:', err)
    });
  }

  chooseLocation(location: any) {
    this.chooseLocationName = location.LocationName;
    this.chooseLocationData = location;
    this.chooseWeatherName = '';
    this.chooseWeatherData = null;
  }

  chooseWeather(weather: any) {
    this.chooseWeatherName = weather.ElementName;
    this.chooseWeatherData = weather;
  }

  weatherIcon(name: string): string {
    const map: Record<string, string> = {
      '平均溫度':         '🌡️',
      '最高溫度':         '🔺',
      '最低溫度':         '🔻',
      '平均露點溫度':     '💧',
      '平均相對濕度':     '💦',
      '最高體感溫度':     '🥵',
      '最低體感溫度':     '🥶',
      '最大舒適度指數':   '😊',
      '最小舒適度指數':   '😌',
      '風速':             '💨',
      '風向':             '🧭',
      '12小時降雨機率':   '🌧️',
      '天氣現象':         '⛅',
      '紫外線指數':       '☀️',
      '天氣預報綜合描述': '📋',
    };
    return map[name] ?? '📌';
  }

  getDisplayValue(elementValue: any): string {
    if (!elementValue) return '—';

    if (elementValue.Temperature)
      return elementValue.Temperature + ' °C';
    if (elementValue.MaxTemperature)
      return '🔺 ' + elementValue.MaxTemperature + '° / 🔻 ' + elementValue.MinTemperature + '°';
    if (elementValue.DewPoint)
      return elementValue.DewPoint + ' °C';
    if (elementValue.RelativeHumidity)
      return elementValue.RelativeHumidity + ' %';
    if (elementValue.ApparentTemperature)
      return elementValue.ApparentTemperature + ' °C';
    if (elementValue.ComfortIndex)
      return elementValue.ComfortIndexDescription + '（' + elementValue.ComfortIndex + '）';
    if (elementValue.WindSpeed)
      return elementValue.BeaufortScale + '級（每秒' + elementValue.WindSpeed + '公尺）';
    if (elementValue.WindDirection)
      return elementValue.WindDirection;
    if (elementValue.ProbabilityOfPrecipitation !== undefined)
      return elementValue.ProbabilityOfPrecipitation === '-'
        ? '無資料'
        : elementValue.ProbabilityOfPrecipitation + ' %';
    if (elementValue.Weather)
      return elementValue.Weather;
    if (elementValue.UVIndex)
      return elementValue.UVIndex + '（' + elementValue.UVExposureLevel + '）';

    return '—';
  }
hoveredDistrict = '';

onMapClick(locationName: string): void {
  console.log('點擊:', locationName);
  const loc = this.locationArray.find(
    l => l.LocationName === locationName
  );

  if (!loc) {
    console.warn('找不到對應地區:', locationName);
    return;  // 找不到就直接 return，不更新狀態
  }

  this.chooseLocation(loc);
}
}

