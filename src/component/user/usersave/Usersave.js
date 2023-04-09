import"./Usersave.css";
import { useForm } from 'react-hook-form';

function Usersave(){
    const { register, handleSubmit, watch ,formState: { isSubmitting, isDirty, errors }, } = useForm({});
    const password = watch("input_pw", "");
    const onsubmit = async data => {
        await new Promise((r) => setTimeout(r, 1000));
        console.log(password)
        alert(JSON.stringify(data));
    };
 

    const month = [];
    const city=[];
    const Do=['서울','부산','대구','인천','광주','대전','울산','경기도','경상도','충청도','전라도','강원도','제주도'];
    for(let i=1; i<=12; i++) 
        month.push(<option key={`month${i}`} value={i}>{i}</option>);
    Do.forEach(e => {
        city.push(
            <option key={`city${e}`} value={e}>{e}</option>
        );
    });
  return (
    <div className="container-join">
        <div>
            <form className='join-case' name='form' method='get' onSubmit={e=>e.preventDefault()}>
                <div>
                    <p>아이디</p>
                    <input type='text' name='input_id' placeholder='아이디' 
                    aria-invalid={!isDirty ? undefined : errors.input_id ? "true" : "false"}
                    {...register("input_id", {
                      required: "아이디는 필수 입력입니다.",
                      minLength:{
                        value:4,
                        message:"적어도 4자 이상 아이디를 사용하세요"
                      }
                    })}
                    />
                </div>
                {errors.input_id && <small role="alert" className='err_mess'>{errors.input_id.message}</small>}
                <div>
                    <p>비밀번호</p>
                    <input type='password' name="input_pw" placeholder='비밀번호'
                       aria-invalid={!isDirty ? undefined : errors.input_pd ? "true" : "false"}
                       {...register("input_pw", {
                         required: "비밀번호는 필수 입력입니다.",
                         minLength: {
                           value: 8,
                           message: "8자리 이상 비밀번호를 사용하세요.",
                         },
                       })}
                    />
                </div>
                {errors.input_pw && <small role="alert" className='err_mess'>{errors.input_pw.message}</small>}
                
                <div>
                    <p>비밀번호 재확인</p>
                    <input type='password' name="password_check" placeholder='비밀번호 재확인'
                   aria-invalid={!isDirty ? undefined : errors.password_check ? "true" : "false"}
                    {...register("password_check", {
                        validate: value => value === password || '비밀번호가 일치하지 않습니다.',
                        required: "비밀번호체크는 필수 입니다.",
                      })}
                    />
                </div>
                {errors.password_check && <small role="alert" className='err_mess'>{errors.password_check.message}</small>}
                <div>
                    <p>이름</p>
                    <input type='text' name="name" placeholder='이름'
                     aria-invalid={!isDirty ? undefined : errors.name ? "true" : "false"}
                     {...register("name", {
                         required: "이름은 필수 입력입니다.",
                       })}
                    />
                </div>
                {errors.name && <small role="alert" className='err_mess'>{errors.name.message}</small>}

                <div id='gender-join'>
                    <p>성별</p> 
                    <div>
                        <select id="gender" name="gender" aria-label="설병"
                         aria-invalid={!isDirty ? undefined : errors.gender ? "true" : "false"}
                         {...register("gender",{
                         required:"성별 선택은 필수입니다."
                        })}
                         >
                            <option value="">성별</option>
                            <option value="man">남</option>
                            <option value="woman">여</option>
                        </select>
                    </div>
                    {errors.gender && <small role="alert" className='err_mess'>{errors.gender.message}</small>}
                </div>

                <div id='personId-join'>
                    <p>주민번호</p>
                    <input type='text' name="front" clasnames="personId" placeholder='6자 입력바랍니다'
                        aria-invalid={!isDirty ? undefined : errors.front ? "true" : "false"}
                        {...register("front",{
                        required:"주민번호 앞자리를 입력해주세요"
                        ,pattern:{
                            value: /[0-9]{6}/,
                            message:"숫자로 6자 입력해주세요."
                        }
                       })}
                    />
                    <input type='password' name="rear" placeholder='7자 입력 바랍니다'
                       aria-invalid={!isDirty ? undefined : errors.rear ? "true" : "false"}
                       {...register("rear",{
                       required:"주민번호 뒷자리를 입력해주세요."
                       ,pattern:{
                        value: /[0-9]{7}/,
                        message:"숫자로 7자 입력해주세요."
                    }
                      })}
                    />
                </div>
                    {errors.front && <small role="alert" className='err_mess'>{errors.front.message}</small>}
                    {!errors.front &&errors.rear && <small role="alert" className='err_mess'>{errors.rear.message}</small>}
                   
                <div>
                    <p>휴대전화</p>
                    <input type='text' name="phonenumber" placeholder='010-xxxx-xxxx'
                     aria-invalid={!isDirty ? undefined : errors.phonenumber ? "true" : "false"}
                     {...register("phonenumber", {
                        required: "핸드폰번호는 필수 입력입니다.",
                        pattern:{
                            value: /[0-9]{11}/,
                            message:"010까지 11자 입력해주세요."
                        }
                       })}
                    />
                </div>
                {errors.phonenumber && <small role="alert" className='err_mess'>{errors.phonenumber.message}</small>}
                <div id='post-join'>
                    <p>주소</p> 
                    <div>
                        <select id="pp" name="area" aria-label="도"
                         aria-invalid={!isDirty ? undefined : errors.area ? "true" : "false"}
                         {...register("area",{
                         required:"지역 선택은 필수입니다."
                        })}
                         >
                            <option value="">도</option>
                            {city}
                        </select>
                        <input type='text' name='address'  placeholder='주소'
                           aria-invalid={!isDirty ? undefined : errors.address ? "true" : "false"}
                           {...register("address",{
                           required:"주소입력은 필수입니다."
                          })}
                        />
                        <input type="text" name="postnumber" placeholder='우편번호'
                         aria-invalid={!isDirty ? undefined : errors.postnumber ? "true" : "false"}
                         {...register("postnumber",{
                         required:"우편번호 입력은 필수입니다.",
                         minLength:{value:5,
                            message:"5자리 미만 불가능"
                        },
                         maxLength:{value:6,
                            message:"6자리 초과 불가능"
                        },
                         pattern:{
                            value: /[0-9]/g,
                            // message:"숫자로만 입력가능합니다."
                        }
                        })}
                        ></input>
                    </div>
                    {errors.area && <small role="alert" className='err_mess'>{errors.area.message}</small>}
                    {!errors.area &&errors.address && <small role="alert" className='err_mess'>{errors.address.message}</small>}
                    {!errors.area &&!errors.address &&errors.postnumber && <small role="alert" className='err_mess'>{errors.postnumber.message}</small>}
                </div>
                <input type="submit"value='가입하기' onClick={handleSubmit(onsubmit)}></input>
            </form>
      </div>
      <div id='last'></div>
    </div>
  );
}

export default Usersave;
