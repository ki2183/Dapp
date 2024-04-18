import"./Usersave.css";
import { set, useForm } from 'react-hook-form';
import axios from "axios";
import { useState,useRef } from "react";

function Usersave(){
    const { register, handleSubmit, watch ,formState: { isSubmitting, isDirty, errors }, } = useForm({});

    const city=[];
    const month = [];
    const Do=['서울','부산','대구','인천','광주','대전','울산','경기도','경상도','충청도','전라도','강원도','제주도'];
    for(let i=1; i<=12; i++) 
        month.push(<option key={`month${i}`} value={i}>{i}</option>);
    Do.forEach(e => {
        city.push(
            <option key={`city${e}`} value={e}>{e}</option>
        );
    });
    
    const [idcheck,setIdcheck] = useState(true)

    const check_id= watch("username","")
    const email = watch("email","")
    const password = watch("password", "")
    const email_check_num = watch("email_check","true")
    
    const [email_check_value,setEmail_check_value] = useState("#@&*asd@#(&fh")
    const [tf ,setTF] = useState(false)
    const EmailCheckHandler=email_=>{
      setEmail_check_value("true")
      setTF(true)
      if(tf===false){
      //   axios.post('/email/send',JSON.stringify(email_data), {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   })
      //   .then(res=>{
      //     console.log(res.data.authCode)
      //     setEmail_check_value(res.data.authCode)
      //     console.log(email_check_value)
      //     setTF(true)
      //   })
      //   .catch(err=>{
      //     console.log(err+"email")
      //   })
      }
    }


      const onsubmit = async dt => {
          await new Promise((r) => setTimeout(r, 1000));
          delete dt.password_check
          delete dt.email
          dt.address = {
            "city": dt.city,
            "street": dt.street,
            "zipcode": dt.zipcode,
          }
          delete dt.city
          delete dt.street
          delete dt.zipcode
          delete dt.email_check
          alert('회원가입 완료(사실아님)')
          window.location.href="/login"
          // axios.post('/users/save', JSON.stringify(dt), {
          //   headers: {
          //     'Content-Type': 'application/json'
          //   }
          // })
          // .then((res) => {
          //   console.log(res.data); // 전송 결과를 처리하는 코드
          //   window.location.href="/login"
          // })
          // .catch((error) => {
          //   console.error(error); // 오류를 처리하는 코드
          // });
          
      };

    async function ID_CHECK(id){
        setIdcheck(true)
        // if(id!==undefined){
        //   try {
        //       const res = await axios.get(`/users/${id}/check-username`);
        //       !res.data.data ? alert("사용가능한 아이디 입니다."): alert("아이디가 중복됩니다.")

        //       setIdcheck(res.data.data.authCode);
        //     } catch (error) {
        //       console.log("사용불가")
        //       setIdcheck(true)
        //     }
        //   }
        //   else{
        //     setIdcheck(true)
        //     alert("아이디 입력란이 비어있습니다.")
        //   }
    }
 

  return (
    <div className="container-join">
        <div>
            <form className='join-case' name='form' method='get' onSubmit={e=>{e.preventDefault()
            window.location.href = '/login'  
          }
            }>
                <div>
                    <h1 id="usersave-title">회원가입</h1>
                    <p>아이디</p>
                    <input type='text' name='username' id="join-input" placeholder='아이디' onInput={e=>{e.preventDefault(); setIdcheck(true);}}
                    aria-invalid={!isDirty ? undefined : errors.username ? (!idcheck ? "true" : "false") : "false"}
                    {...register("username", {
                      required: "아이디는 필수 입력입니다.",
                      minLength:{
                        value:4,
                        message:"적어도 4자 이상 아이디를 사용하세요",
                      },
                    })}
                    />
                <button id="id-check-button" onClick={e=>{
                    e.preventDefault();
                    ID_CHECK(check_id);
                }}>중복 확인</button>
                </div>
                {errors.username && <small role="alert" className='err_mess'>{errors.username.message}</small>}
                {!errors.username && idcheck!==true && <small role="alert" className='err_mess'>아이디 중복 체크를 완료하세요.</small>}
                <div>
                    <p>비밀번호</p>
                    <input type='password' name="password" placeholder='비밀번호'
                       aria-invalid={!isDirty ? undefined : errors.input_pd ? "true" : "false"}
                       {...register("password", {
                         required: "비밀번호는 필수 입력입니다.",
                         minLength: {
                           value: 8,
                           message: "8자리 이상 비밀번호를 사용하세요.",
                         },
                        
                       })}
                    />
                </div>
                {errors.password && <small role="alert" className='err_mess'>{errors.password.message}</small>}
                
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

                <div>
                    <p>닉네임</p>
                    <input type='text' name="nickName" placeholder='닉네임'
                     aria-invalid={!isDirty ? undefined : errors.nickName ? "true" : "false"}
                     {...register("nickName", {
                         required: "닉네임은 필수 입력입니다.",
                       })}
                    />
                </div>
                {errors.nickName && <small role="alert" className='err_mess'>{errors.nickName.message}</small>}

                <div id='gender-join'>
                    <p>성별</p> 
                    <div>
                        <select id="gender" name="gender" aria-label="성별"
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

                <div id='post-join'>
                    <p>주소</p> 
                    <div>
                        <input type='text' name='city'  placeholder='도시'
                           aria-invalid={!isDirty ? undefined : errors.city ? "true" : "false"}
                           {...register("city",{
                           required:"도시입력은 필수입니다."
                          })}
                        />
                        <input type='text' name='street'  placeholder='주소'
                           aria-invalid={!isDirty ? undefined : errors.street ? "true" : "false"}
                           {...register("street",{
                           required:"주소입력은 필수입니다."
                          })}
                        />
                        <input type="text" name="zipcode" placeholder='우편번호'
                         aria-invalid={!isDirty ? undefined : errors.zipcode ? "true" : "false"}
                         {...register("zipcode",{
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
                    {errors.city && <small role="alert" className='err_mess'>{errors.city.message}</small>}
                    {!errors.city &&errors.street && <small role="alert" className='err_mess'>{errors.street.message}</small>}
                    {!errors.city &&!errors.street &&errors.zipcode && <small role="alert" className='err_mess'>{errors.zipcode.message}</small>}
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

                    <div id='email-join'>
                    <p>이메일</p>
                    <input id = 'email-join-input'type='text' name="email" placeholder='이메일 입력바랍니다'
                        aria-invalid={!isDirty ? undefined : errors.email ? "true" : "false"}
                        {...register("email",{
                        required:"이메일을 입력해주세요"
                        ,pattern:{
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message:"이메일 형식으로 입력해주세요."
                        }
                       })}
                    />
                    <button id="email-check-button" onClick={e=>{
                      e.preventDefault(); 
                      if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)===true ){
                          EmailCheckHandler(email);
                          alert("이메일을 보냈습니다.")
                        }
                      else alert("올바른 이메일 형식을 입력해주세요.")
                    }}>이메일 확인</button>
                </div>
                <div>
                <input type="text" value={"true"} id = "email-check-input" name="email_check" placeholder="인증번호"
                 aria-invalid={!isDirty ? undefined : errors.email_check ? "true" : "false"}
                 {...register("email_check", {
                  // validate: value => "true" === email_check_value || '인증번호가 일치하지 않습니다.',
                  // validate: value => value === "true" || '인증번호가 일치하지 않습니다.',
                  validate:value => value === "true" || value === "true",
                  required: "인증번호입력은 필수 입니다.",
                })}></input> <button id="email-check-check" onClick={e=>{e.preventDefault();
                  if(email_check_value === '#@&*asd@#(&fh') 
                    alert("아직 인증번호가 발급되지 않았습니다.") 
                  else{
                    if("true" ===email_check_value) alert("인증번호가 맞습니다.")
                    else alert("인증번호가 다릅니다.")
                  }
                }}>인증번호 체크</button>
                </div>
                {errors.email_check && <small role="alert" className='err_mess'>{errors.email_check.message}</small>}

                <input type="submit"value='가입하기' onClick={
                  handleSubmit(onsubmit)}></input>
              
            </form>
      </div>
      <div id='last'></div>
    </div>
  );
}

export default Usersave;
