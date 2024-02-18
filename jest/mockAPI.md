#### easy simple test api 

```js

describe("Test API", () => {
  test("get api", async() => {
    jest.mocked(get).mockResolvedValue({ data: "xxx"} as any)
    const res = await getXXX()
    expect(get).toBeCalledWith('/api/xxxx')
    expect(res).toEqual("xxx")
  })
})
```
