import "./addressupdate.css"
import axios from "axios";
import { useCookies } from 'react-cookie';
import {useEffect , useReft,useState} from "react"
import { useForm} from 'react-hook-form';



function UpdateAddress(probs){
    const [cookies] = useCookies(['token'])
    const token = cookies.token
    const { register, handleSubmit, watch ,formState: { isDirty, errors }, } = useForm({});

    const Onsubmit = data=>{
        const dto= {
            "userId" : token.id,
            "name" : data.name,
            "deliveryCity":data.deliveryCity,
            "deliveryStreet" :data.deliveryStreet,
            "deliveryZipcode" : data.deliveryZipcode,
        }
        alert(JSON.stringify(dto))

        axios.post(`/deliveryAddress/save`, JSON.stringify(dto), {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then(res=>{
            console.log(res)
            window.location.href="/"
        }).catch(err=>{
            console.log(err+"axios")
        })
    }



    return  <form className="form-address" method="post" onSubmit={handleSubmit(Onsubmit)}>
                <div className="info_form_div">
                    <label htmlFor="name">주소 별명</label>
                    <input type="text"
                    name="name" 
                    {...register("name",{required:"! 이름은 필수입력 칸입니다."})}/>
                    {errors.name && <small className='err_message' role="alert">{errors.name.message}</small>}
                </div>

                <div className="info_form_div">
                    <label htmlFor="name">시,구</label>
                    <input type='text' name="deliveryCity" placeholder='시,구'
                        aria-invalid={!isDirty ? undefined : errors.deliveryCity ? "true" : "false"}
                        {...register("deliveryCity",{required:"주소 입력은 필수입력 칸입니다."}
                    )}/>
                    {errors.name && <small className='err_message' role="alert">{errors.name.message}</small>}
                </div>

                <div className="info_form_div">
                    <label htmlFor="name">주소</label>
                    <input type='text' name='deliveryStreet'  placeholder='주소'
                        aria-invalid={!isDirty ? undefined : errors.deliveryStreet ? "true" : "false"}
                        {...register("deliveryStreet",{required:"주소 입력은 필수입력 칸입니다."}
                    )}/>
                    {errors.name && <small className='err_message' role="alert">{errors.name.message}</small>}
                </div>

                <div className="info_form_div">
                    <label htmlFor="name">우편번호</label>
                    <input type="text" name="deliveryZipcode" placeholder='우편번호'
                                aria-invalid={!isDirty ? undefined : errors.deliveryZipcode ? "true" : "false"}
                                {...register("deliveryZipcode",{
                                required:"우편 번호는 필수입력 칸입니다.",
                                minLength:{value:5,
                                    message:"5자리 미만 불가능"
                                },
                                maxLength:{value:6,
                                    message:"6자리 초과 불가능"
                                },
                                pattern:{
                                    value: /[0-9]/g,
                                }
                    })}></input>

                </div>

                {errors.area && <small role="alert">{errors.deliveryCity.message}</small>}
                {!errors.area &&errors.deliveryStreet && <small role="alert">{errors.deliveryStreet.message}</small>}
                {!errors.area &&!errors.deliveryStreet &&errors.deliveryZipcode && <small role="alert">{errors.deliveryZipcode.message}</small>}
                              

               
                            

                <button className="address_button" onClick={e=>{
                    // e.preventDefault()
                }}> 배달 주소 설정하기</button>
    </form>
}

function Addressupdate(){
    return <div className="container-address">
      <UpdateAddress></UpdateAddress>
    </div>
}

export default Addressupdate;