class Api {
  private url: string;
  private headers: object;

  constructor(url: string, headers: object) {
    this.url = url;
    this.headers = headers;
  }

  request(type: string, params?: string): Promise<object> {
    switch (type) {
      case 'INIT_TEACHERS_IDS':
        params = `/search/teacherIds/?subjectId=1&areaId=1&districtId=1`;
        break;
      case 'TEACHERS_IDS':
        params = `/search/teacherIds/?${params}`;
        break;
      case 'TEACHERS_SHORT_DATA':
        params = `/teachers/short/?${params}`;
        break;
      case 'AREAS_IDS':
        params = `/areas`;
        break;
      case 'SUBJECTS_IDS':
        params = `/subjects`;
        break;
      case 'DISTRICTS_IDS':
        params = `/districts/?areaId=${params}`;
        break;
      default:
        break;
    }
    return fetch(`${this.url}${params}`, this.headers)
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(res.status);
        }
        return Promise.resolve(res.json())
          .then((data) => {
            return { data, status: res.status }
          })
      })
  }
}

const BASE_URL: string = 'https://api.repetit.ru/public';
const HEADERS: object = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const api = new Api(BASE_URL, HEADERS);

export default api
