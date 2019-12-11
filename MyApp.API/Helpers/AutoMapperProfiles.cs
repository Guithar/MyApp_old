using System.Linq;
using AutoMapper;
using MyApp.API.Dtos;
using MyApp.API.Models;

namespace MyApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.MapFrom(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.MapFrom(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, opt => opt
                    .MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, opt => opt
                    .MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<Client,ClientForListDto>();
            CreateMap<Client,ClientForDetailedDto>();
            CreateMap<ClientForUpdateDto,Client>();
            CreateMap<ClientForCreationDto,Client>();
            CreateMap<Client,ClientToReturnDto>();
            CreateMap<Client,ClientForAssetDto>();


            CreateMap<Product,ProductForListDto>().ReverseMap();
            CreateMap<ProductForUpdateDto,Product>();
            CreateMap<ProductForCreationDto,Product>();
            CreateMap<Product,ProductForDetailedDto>();
            CreateMap<ProductCategory,ProductCategoryForListDto>();

            CreateMap<MaintScheduleAsset,MaintScheduleAssetDto>()
             .ForMember(m => m.Name, opt => opt
                    .MapFrom(msa => msa.MaintSchedule.Name))
            .ForMember(m => m.Description, opt => opt
                    .MapFrom(msa => msa.MaintSchedule.Description))
            
            .ForMember(m => m.MonthsInterval, opt => opt
                    .MapFrom(msa => msa.MaintSchedule.MonthsInterval))
            .ForMember(m => m.LastInspectionDate, opt => opt
                .MapFrom(msa => msa.MaintResults
                    .OrderByDescending(c => c.ExecutedOn)
                    .FirstOrDefault().ExecutedOn))
            .ForMember(m => m.NextInspectionDate, opt => opt
                .MapFrom(msa => msa.MaintResults
                    .OrderByDescending(c => c.ExecutedOn)
                    .FirstOrDefault().NextInspectionDate))
            .ForMember(m => m.LastResult, opt => opt
                .MapFrom(msa => msa.MaintResults
                    .OrderByDescending(c => c.ExecutedOn)
                    .FirstOrDefault().Result));
   
            CreateMap<Asset,AssetForListDto>()
            .ForMember(a => a.Inspections, opt => opt
                .MapFrom(msa => msa.MaintScheduleAssets))
            .ForPath(a => a.product.Id, opt => opt
                    .MapFrom(msa => msa.Product.Id))
            .ForPath(a => a.product.Name, opt => opt
                    .MapFrom(msa => msa.Product.Name))
            .ForPath(a => a.product.Description, opt => opt
                    .MapFrom(msa => msa.Product.ProductCategory.Description))
            .ForPath(a => a.product.ProductCategoryId, opt => opt
                    .MapFrom(msa => msa.Product.ProductCategoryId))
            .ForPath(a => a.product.ProductCategoryName, opt => opt
                    .MapFrom(msa => msa.Product.ProductCategory.Name));
                      
                 
            CreateMap<Asset,AssetForDetailedDto>();
            CreateMap<AssetForUpdateDto,Asset>();
            CreateMap<AssetForCreationDto,Asset>();

            CreateMap<MaintSchedule,MaintSchedulesForListDto>();
        }

    }
}