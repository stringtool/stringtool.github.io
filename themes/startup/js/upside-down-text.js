

((_ => document.readyState == 'loading' ? window.addEventListener('DOMContentLoaded', _) : _())(
    _ => {
        let right_letters = `abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%&()_{}|[]?.,<>'"`;
        let opo_letters = `ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄ZƖᄅƐㄣϛ9ㄥ860¡@#$%⅋)(‾}{|][¿˙'><,,,`;
        _$.upsideDownText = text => {
            _c.letter_count.innerHTML = 'Char: ' + _c.input_text.value.length;
            let res = '';
            text.split('').forEach(letter => {
                let index = right_letters.indexOf(letter);
                if (index > -1) {
                    letter = opo_letters[index];
                }
                else {
                    index = opo_letters.indexOf(letter);
                    if (index > -1) {
                        letter = right_letters[index];
                    }
                }
                res += letter;
            });
            return res;
        };

        let _c = _$.elemSelector(['#load_sample', '#refresh_tool', '#copy_input_text', /* '#save_input_in_link', */ '#delete_input', '#input_text', '#auto', '#main_action_btn', '#upload_file', '#input_file'/* , '#load_from_url' */, '#copy_result', '#save_result_in_file', '#result_text', '#letter_count']);


        _c.input_text.addEventListener('input', _ => _c.auto.checked ? _c.result_text.value = _$.upsideDownText(_c.input_text.value) : '');


        _c.main_action_btn.addEventListener('click', _ => _c.result_text.value = _$.upsideDownText(_c.input_text.value));



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

