((_ => document.readyState == 'loading' ? window.addEventListener('DOMContentLoaded', _) : _())(
    _ => {
        let result = document.querySelector('#result');
        let copy_btn = document.querySelector('#copy_btn');
        let result_row = document.querySelector('#result_row');
        let generate_now = document.querySelector('#generate_now');
        let lower_case = document.querySelector('#lower_case');
        let digits = document.querySelector('#digits');
        let upper_case = document.querySelector('#upper_case');
        let symbols = document.querySelector('#symbols');
        let more_symbol = document.querySelector('#more_symbol');
        let skip_similar = document.querySelector('#skip_similar');
        let all_unique = document.querySelector('#all_unique');

        let pass_length_rang = document.querySelector('#pass_length');
        let show_length = document.querySelector('#show_length');
        let number_of_pass = document.querySelector('#number_of_pass');


        function passwordGenerator() {
            let password = '';
            let possible = '';
            let pass_length = pass_length_rang.value;

            let is_first_pass_generated = false;


            show_length.value = pass_length;

            if (lower_case.checked) {
                possible += 'abcdefghijklmnopqrstuvwxyz';
            }
            if (digits.checked) {
                possible += '0123456789';
            }
            if (upper_case.checked) {
                possible += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            }
            if (symbols.checked) {
                possible += '@#$%&()_+-=[]{}|;:,';
            }
            if (more_symbol.checked) {
                possible += '~';
            }


            if (skip_similar.checked) {
                'l1iI0O'.split('').forEach(ltr => possible = possible.replaceAll(ltr, ''));
            }

            is_first_pass_generated = false;
            result_row.innerHTML = '';
            for (let i = 0; i < number_of_pass.value; i++) {

                password = _$.randomString(possible, pass_length, all_unique.checked);

                if (is_first_pass_generated) {

                    result_row.insertAdjacentHTML('beforeend', `<div class="row remove_this">
                                     <div class="col-sm-12 col-md-8">
                                            <label for="result">Result</label>
                                            <div class="input-group mb-3">
                                                <input value="${password}" id="" type="text" class="form-control result rounded-0" placeholder="Generated Password Will be Here" aria-describedby="button-addon2">
                                                <button class="btn btn-outline-secondary rounded-0 remove_btn" type="button" id="reset_btn"><i class="icon icon-exit bg-dark icon-light  mb-1"></i></button>
                                            </div>

                                        </div>
                                        <div class="col-sm-12 col-md-4 mt-3">
                                            <button id="copy_btn" type="button" class="btn btn-success mt-1 copy_btn rounded-0">
                                                <i class="icon icon-copy bg-light icon-success mb-1"></i> Copy</button>
                                            <button type="button" class="btn btn-info rounded-0 mt-1 regenerate">Re-Generate</button>
                                        </div>
                                        </div>`);
                } else {
                    is_first_pass_generated = true;
                    result.value = password;
                }
            }


            result_row.querySelectorAll('div.remove_this').forEach(block_of_code => {

                // regenerate a password in a single block of code
                block_of_code.querySelector('button.regenerate').addEventListener('click', _ => block_of_code.querySelector('input.result').value = _$.randomString(possible, pass_length, all_unique.checked));

                block_of_code.querySelector('button.remove_btn').addEventListener('click', _ => {
                    block_of_code.remove();
                    number_of_pass.value = parseInt(number_of_pass.value) - 1;

                });


                block_of_code.querySelector('button.copy_btn').addEventListener('click', _ => _$.copyToClipboard(block_of_code.querySelector('input.result').value).then(_r => _r ? _$.makeToasts('success', { 'body': 'Password Successfully Copied' }) : _$.makeToasts('error', { 'body': 'Unable to Copy' })));

            });


        }

        pass_length_rang.addEventListener('input', passwordGenerator);

        document.querySelectorAll('input[type=checkbox]').forEach(x => x.addEventListener('change', passwordGenerator));

        generate_now.addEventListener('click', passwordGenerator);

        copy_btn.addEventListener('click', _ => _$.copyToClipboard(result.value).then(_r => _r ? _$.makeToasts('success', { 'body': 'Password Successfully Copied' }) : _$.makeToasts('error', { 'body': 'Unable to Copy' })));
    }
));

