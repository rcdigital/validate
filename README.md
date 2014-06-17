#Validate 

version: 0.1.0

> Validate is a requireJS module to validate forms

### Bower 

`
bower install validate
`

### Usage Example

First you need to define all required inputs using the class "required".

```html
<form id="frm-validate">
    <label for="email">E-mail</label>
    <input type="text" name="email" class="inputs required" />
</form>
```

### JavaScript Integration

Now, you need to create a validate instance.

**Pure JavaScript**
```js

define(['validate'], function (validate) {
    var frm = $('#frm-validate');
    var formvalidate = new validate.Validate(form);

    //Check if form is valid
    if (formvalidate.isValid()) {
        //Code Here...
    }
});
```


## Contribuitors

* Erick Belfort [@erickbelfy](https://github.com/erickbelfy)


## License

Licensed under the MIT License
