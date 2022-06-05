
((_ => document.readyState == 'loading' ? window.addEventListener('DOMContentLoaded', _) : _())(
    _ => {

        let selected_case = 'lower', _c = _$.elemSelector(['#load_sample', '#refresh_tool', '#copy_input_text', /* '#save_input_in_link', */ '#delete_input', '#input_text', '#auto', '#upload_file', '#input_file', '#add_new_line', '#padded_space', '#line_separator', '#copy_result', '#save_result_in_file', '#result_text', 'input', '#letter_count', '#rot_level', '#convert_now']);

        _$.rotPlace = (str, place_count = 0) => str = str.replace(/[a-zA-Z]/g, c => { return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + place_count) ? c : c - 26) });


        let convertNow = _ => {
            _c.result_text.value = _$.rotPlace(_c.input_text.value, parseInt(_c.rot_level.value));
            _c.letter_count.innerHTML = 'Char: ' + _c.input_text.value.length;
        }

        _c.input_text.addEventListener('input', _ => _c.auto.checked ? convertNow() : '');
        _c.rot_level.addEventListener('change', _ => _c.auto.checked ? convertNow() : '');

        _c.convert_now.addEventListener('click', convertNow);



        // will default

        _c.copy_input_text.addEventListener('click', _ => _$.copyToClipboard(_c.input_text.value).then(_r => _r ? _$.makeToasts('success', { 'body': 'Input Text Successfully Copied' }) : _$.makeToasts('error', { 'body': 'Unable to Copy' })));


        _c.copy_result.addEventListener('click', _ => _$.copyToClipboard(_c.result_text.value).then(_r => _r ? _$.makeToasts('success', { 'body': 'Result Text Successfully Copied' }) : _$.makeToasts('error', { 'body': 'Unable to Copy' })));


        _c.delete_input.addEventListener('click', _ => {
            _c.result_text.value = '';
            _c.input_text.value = '';
            _$.makeToasts('danger', { 'body': 'Input Text Deleted' });
        });


        _c.refresh_tool.addEventListener('click', _$.refreshPage);

        _c.load_sample.addEventListener('click', _ => _c.input_text.value = SLUG);


        _c.upload_file.addEventListener('click', _ => _c.input_file.click());

        _c.input_file.addEventListener('click', _ => {
            _$.uploadFileData('input_file', _c.input_text);

        });

        _c.save_result_in_file.addEventListener('click', _ => _$.downloadFile(_c.result_text.value, SLUG + '.txt'));
    }
));

