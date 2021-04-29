class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers
  }

  _handleOriginalResponse(res) {
    if (!res.ok) {
      return Promise.reject(res.status);
    }
    return Promise.resolve(res.json())
      .then((data) => {
        return { data, status: res.status }
      })
  };

  getInitialData() {
    return Promise.all([this.getSubjects(), this.getAreas()]);
  }

  getTeachersShortData(params) {
    return fetch(`${this._url}/teachers/short/?${params}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleOriginalResponse)
  }

  getInitialTeachersIds() {
    return fetch(`${this._url}/search/teacherIds/?subjectId=1&areaId=1&districtId=1`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleOriginalResponse)
  }

  getTeacherIds(params) {
    return fetch(`${this._url}/search/teacherIds/?${params}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleOriginalResponse)
  }

  getAreas() {
    return fetch(`${this._url}/areas`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleOriginalResponse)
  }

  getSubjects() {
    return fetch(`${this._url}/subjects`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleOriginalResponse)
  }

  getDistricts(areaId) {
    return fetch(`${this._url}/districts/?areaId=${areaId}`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handleOriginalResponse)
  }
}

const api = new Api({
  baseUrl: 'https://api.repetit.ru/public',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

export default api;
