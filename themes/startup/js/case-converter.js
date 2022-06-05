
((_ => document.readyState == 'loading' ? window.addEventListener('DOMContentLoaded', _) : _())(
    _ => {

        let selected_case = 'lower', _c = _$.elemSelector(['#load_sample', '#refresh_tool', '#copy_input_text', /* '#save_input_in_link', */ '#delete_input', '#input_text', '#auto', '#upload_file', '#input_file', '#add_new_line', '#padded_space', '#line_separator', '#copy_result', '#save_result_in_file', '#result_text', 'input', '#letter_count', '#upper_case', '#lower_case', '#title_case', '#sentence_case']);

        let caseConverter = (text_case = '') => {

            ['lower', 'upper', 'title', 'sentence'].indexOf(text_case) == -1 ? '' : selected_case = text_case;

            text = _c.input_text.value.toLowerCase();
            if (selected_case == 'lower') {
                text = text.toLowerCase();
            } else if (selected_case == 'upper') {
                text = text.toUpperCase();
            } else if (selected_case == 'title') {
                text = _$.titleCase(text);
            } else if (selected_case == 'sentence') {
                text = _$.sentenceCase(text);
            } else {
                text = text;
            }
            _c.result_text.value = text;
            _c.letter_count.innerHTML = 'Char: ' + _c.input_text.value.length;
        }

        _c.input_text.addEventListener('input', _ => _c.auto.checked ? caseConverter() : '');


        _c.upper_case.addEventListener('click', _ => caseConverter('upper'));
        _c.lower_case.addEventListener('click', _ => caseConverter('lower'));
        _c.title_case.addEventListener('click', _ => caseConverter('title'));
        _c.sentence_case.addEventListener('click', _ => caseConverter('sentence'));



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

