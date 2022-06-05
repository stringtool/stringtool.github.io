
((_ => document.readyState == 'loading' ? window.addEventListener('DOMContentLoaded', _) : _())(
    _ => {



        _$.stringBuilder = _ => {
            _c.letter_count.innerHTML = 'Char: ' + _c.input_text.value.length;
            return "'" + (_c.padded_space.checked ? ' ' : '') + _c.input_text.value.replaceAll("'", '"').trim().split('\n').join((_c.add_new_line.checked ? '\\n' : '') + "' " + _c.line_separator.value.trim() + '\n' + "'" + (_c.padded_space.checked ? ' ' : '')) + "';"
        };



        let _c = _$.elemSelector(['#load_sample', '#refresh_tool', '#copy_input_text', /* '#save_input_in_link', */ '#delete_input', '#input_text', '#auto', '#build_now', '#upload_file', '#input_file', '#add_new_line', '#padded_space', '#line_separator', '#copy_result', '#save_result_in_file', '#result_text', 'input', '#letter_count']);



        _c.input_text.addEventListener('input', _ => _c.auto.checked ? _c.result_text.value = _$.stringBuilder() : '');

        _c.input_text.addEventListener('change', _ => _c.auto.checked ? _c.result_text.value = _$.stringBuilder() : '');

        _c.input.forEach(inp => inp.addEventListener('input', _ => _c.auto.checked ? _c.result_text.value = _$.stringBuilder() : ''));

        _c.build_now.addEventListener('click', _ => _c.result_text.value = _$.stringBuilder());



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

